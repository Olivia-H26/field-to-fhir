# Field to FHIR

**Field Impression → Hospital Discharge Disposition**

Field to FHIR shows EMS providers what happened to the patients they transported. It compares the field impressions with the hospital discharge diagnoses.

- **App:** https://olivia-h26.github.io/field-to-fhir/launch.html

## Standards used

- HL7 FHIR R4 (4.0.1)
- HL7 US Core 6.1.0
- HL7 SMART App Launch 2.2.0

## Running the demo

1. Open `admin-load.html` (https://olivia-h26.github.io/field-to-fhir/admin-load.html) and sign in. The page checks the synthetic data with the HL7 FHIR Validator, then creates only the records that are missing.
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

Data loader (`admin-load.html`), create, read and search, with no update or delete:

```text
openid fhirUser
user/Organization.crs user/Practitioner.crs user/PractitionerRole.crs user/Patient.crs
user/Encounter.crs user/Condition.crs user/Observation.crs user/Procedure.crs
```

## Privacy, confidentiality and security

All data is synthetic: fictional people and organizations. Never put real patient information into this app or the sandbox.

**Privacy (minimum necessary)**

- The dashboard requests only the EMS calls the signed-in provider worked, then reads only those patients.
- Users who are not this agency's EMS providers see no patients.
- Measurements are requested only for the codes the dashboard shows.

**Confidentiality**

- Diagnoses the hospital labeled restricted (HL7 confidentiality code R) are never requested. The dashboard asks the server only how many exist, then shows a notice.
- The triage tag QR code holds only the tag identifier, with no name and no health information.

**Security**

- Sign-in uses SMART App Launch 2.2.0 with PKCE, and the app accepts only trusted sign-in servers.
- The dashboard's permissions are read and search only.
- The app never displays access tokens.

## Unidentified patients (mass casualty incident)

When a patient is unresponsive or has no ID, the record uses a temporary alias name (FHIR `name.use = temp`) instead of "John Doe," and gender is recorded as unknown rather than assumed.

The triage tag ID from the scene is stored on both the EMS call and the hospital visit, so the outcome matches without a name. The dashboard shows the tag as a QR code that holds only the triage tag identifier (the tag ID and its identifier system), with no name and no health information.

Once the hospital identifies the patient, the alias record points to the identified record with a FHIR `Patient.link` of type `replaced-by`, which in FHIR means the alias record must no longer be used and the identified record is used in its place. The dashboard follows that link and shows the identified name.
