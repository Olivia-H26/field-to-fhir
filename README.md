# Field to FHIR

**Field Impression → Hospital Discharge Disposition**

Field to FHIR shows EMS providers what happened to the patients they transported. It compares the field impressions with the hospital discharge diagnoses.

- **App:** https://olivia-h26.github.io/field-to-fhir/launch.html

## Standards used

- HL7 FHIR R4 (4.0.1)
- HL7 US Core 6.1.0
- HL7 SMART App Launch 2.2.0

## Running the demo

1. Open `admin-load.html` (https://olivia-h26.github.io/field-to-fhir/admin-load.html) and sign in. The page checks the synthetic data with the HL7 FHIR Validator, then creates the records that are missing and updates any that are out of date. Running it again does not create duplicates.
2. Open `launch.html` and select **Sign in**.

## Files

| File | Purpose |
| --- | --- |
| `launch.html` | Sign-in page. Starts a SMART standalone provider launch with PKCE and accepts only trusted sign-in servers. |
| `index.html` | Dashboard after sign-in. Shows only the signed-in EMS provider's own calls. |
| `admin-load.html` | Loads the synthetic data into the sandbox after it passes the HL7 FHIR Validator. |
| `health.html` | Hosting check. |
| `js/smart-config.js` | The sandbox address used by every sign-in page. |
| `field-to-fhir-data.json` | The synthetic data, as one FHIR transaction Bundle. |
| `synthetic-patient-cases.json` | The synthetic case scenarios the data is built from. |

## Permissions

Dashboard (`launch.html`), read and search only:

```text
openid fhirUser
user/Organization.rs user/Practitioner.rs user/PractitionerRole.rs
user/Patient.rs user/Encounter.rs user/Condition.rs user/Observation.rs
```

Data loader (`admin-load.html`), create, read, update and search, with no delete. Update lets a reload bring records already in the sandbox up to date with the data file:

```text
openid fhirUser
user/Organization.crus user/Practitioner.crus user/PractitionerRole.crus user/Patient.crus
user/Encounter.crus user/Condition.crus user/Observation.crus user/Procedure.crus
```

## Privacy, confidentiality and security

All data is synthetic: fictional people and organizations. Never put real patient information into this app or the sandbox.

**Privacy (minimum necessary)**

- The dashboard requests only the EMS calls the signed-in provider worked, then reads only those patients.
- Users who are not this agency's EMS providers see no patients.
- Measurements are requested only for the codes the dashboard shows.

**Confidentiality**

- Diagnoses the hospital labeled restricted (HL7 confidentiality code R) are never requested. The dashboard asks the server only how many exist, then shows a notice.
- The triage tag QR code holds only the sign-in address and the tag number, with no name and no health information. It opens a patient only after sign-in, and only for that call's crew.

**Security**

- Sign-in uses SMART App Launch 2.2.0 with PKCE, and the app accepts only trusted sign-in servers.
- The dashboard's permissions are read and search only.
- The app never displays access tokens.

## Unidentified patients (mass casualty incident)

When a patient is unresponsive or has no ID, the record uses a temporary alias name (FHIR `name.use = temp`) instead of "John Doe," and gender is recorded as unknown rather than assumed.

The triage tag ID from the scene is stored on both the EMS call and the hospital visit, so the outcome matches without a name. The dashboard shows the tag as a QR code. It holds only the app's sign-in address and the triage tag number (for example MI-0107, with a state prefix as NASEMSO recommends), with no name and no health information. Scanning it, with the phone camera or the dashboard's Scan triage tag button, asks the server only for the signed-in EMT's own calls with that triage tag identifier (`Encounter?identifier=…&participant=…`) and opens the patient if there is one. Anyone else sees that the tag is not on any of their calls, without learning whether it exists.

Once the hospital identifies the patient, the alias record points to the identified record with a FHIR `Patient.link` of type `replaced-by`, which in FHIR means the alias record must no longer be used and the identified record is used in its place. The dashboard follows that link and shows the identified name.
