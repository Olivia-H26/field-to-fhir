# Field to FHIR

**Field Impression → Hospital Discharge Disposition**

Field to FHIR is a provider-facing SMART on FHIR app. An EMS provider signs in and sees what happened at the hospital to patients from their own calls: the field impression, the hospital diagnosis, and the discharge disposition.

- **App:** https://olivia-h26.github.io/field-to-fhir/launch.html
- **Tour:** https://olivia-h26.github.io/field-to-fhir/tour.html

All data is synthetic: fictional people and organizations. The app runs on the SMART Health IT sandbox, which resets nightly.

## Standards

- HL7 FHIR R4 (4.0.1)
- HL7 US Core 6.1.0
- HL7 SMART App Launch 2.2.0

Test results are evidence for what each test checked. They are not a certification.

## Running the demo

1. Open `admin-load.html` and sign in. The page checks the synthetic data with the HL7 FHIR Validator, then creates only the records that are missing. Run it before each demo, because the sandbox resets nightly.
2. Open `launch.html`, select **Sign in**, and choose one of the agency's EMS providers on the sandbox sign-in page.

## Files

| File | Purpose |
| --- | --- |
| `launch.html` | Sign-in page. Starts a SMART standalone provider launch with PKCE and accepts only trusted sign-in servers. |
| `index.html` | Dashboard after sign-in. Shows only the signed-in EMS provider's own calls. |
| `admin-load.html` | Demo-only page that loads the synthetic data into the sandbox after it passes the HL7 FHIR Validator. A real deployment would not need it. |
| `tour.html` | Guided tour of the app and the standards each feature uses. |
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

## Privacy

- The dashboard requests only the EMS calls the signed-in provider worked, then reads only those patients.
- Users who are not this agency's EMS providers see no patients.
- For restricted diagnoses, the dashboard asks the server only how many exist, then shows a notice. The diagnoses themselves are never requested.
- Measurements are requested only for the codes the dashboard shows.
- The app never displays access tokens.

Never put real patient information into this app or the sandbox.

## Unidentified patients (mass casualty incident)

When a patient is unresponsive or has no ID, the record uses a temporary alias name (FHIR `name.use = temp`) instead of "John Doe," and gender is recorded as unknown rather than assumed. In this demo, the alias is part of the synthetic data; in practice, the registration system would assign it.

The triage tag ID from the scene is stored on both the EMS call and the hospital visit, so the outcome matches without a name. The dashboard shows the tag as a QR code that holds only the triage tag identifier (the tag ID and its identifier system), with no name and no health information.

Once the hospital identifies the patient, the alias record points to the identified record with a FHIR `Patient.link` of type `replaced-by`, which marks the alias record as the duplicate. The dashboard follows that link and shows the identified name.
