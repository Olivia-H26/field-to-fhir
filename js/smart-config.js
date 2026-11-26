// Dashboard door (EMS crew): the same SMART sandbox settings for every dashboard sign-in.
// Provider standalone launch, public client, PKCE required, and a scope cap: the sandbox grants
// read and search (.rs) only, and refuses any other permission, whoever signs in.
// Cap: openid fhirUser user/Organization.rs user/Practitioner.rs user/PractitionerRole.rs user/Patient.rs user/Encounter.rs user/Condition.rs user/Observation.rs
window.EMS_SMART_ISSUER = "https://launch.smarthealthit.org/v/r4/sim/WzIsIiIsIiIsIk1BTlVBTCIsMCwwLDAsIm9wZW5pZCBmaGlyVXNlciB1c2VyL09yZ2FuaXphdGlvbi5ycyB1c2VyL1ByYWN0aXRpb25lci5ycyB1c2VyL1ByYWN0aXRpb25lclJvbGUucnMgdXNlci9QYXRpZW50LnJzIHVzZXIvRW5jb3VudGVyLnJzIHVzZXIvQ29uZGl0aW9uLnJzIHVzZXIvT2JzZXJ2YXRpb24ucnMiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMiwiIl0/fhir";
