import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export function defineAbilityFor(permissions = []) {
  const { can, build } = new AbilityBuilder(createMongoAbility);
  const role = localStorage.getItem("role");
  const seen = new Set();

  // Assign role-based permissions
  if (role === "admin") {
    can("manage", "all"); // Full access
  } else if (role === "host") {
    addIfNotDuplicate("read", "Property");
    addIfNotDuplicate("add", "Property");
    addIfNotDuplicate("edit", "Property");
    addIfNotDuplicate("delete", "Property");
  } else if (role === "user") {
    addIfNotDuplicate("read", "Property");
  }

  // Apply permissions from backend
  permissions.forEach((permissionString) => {
    const [subject, action] = parsePermission(permissionString);
    console.log("subject",subject,"action",action);
    
    if (subject && action) {
      addIfNotDuplicate(action, subject);
    }
  });

  return build();

  // Helper to prevent duplicates
  function addIfNotDuplicate(action, subject) {
    const key = `${action}_${subject}`;
    if (!seen.has(key)) {
      can(action, subject);
      seen.add(key);
    }
  }
}

function parsePermission(permissionString) {
  const parts = permissionString.split("_");
  if (parts.length < 2) return [null, null];

  const subject = capitalize(parts[0]); // "user" -> "User"
  const action = parts.slice(1).join("_"); // "read", "edit", etc.
  return [subject, action];
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
