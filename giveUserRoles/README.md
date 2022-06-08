# giveUserRoles
A critical bug that allows any user to give any roles to any user without any permissions.

## Installation
NpmJS:
```
npm i request-async
```

## Usage
```
node index.js <token> <serverID> <userID> <roleID>
```

- token - The Revolt account session token to use.
- serverID - The target server(ID).
- userID - The target user(ID).
- roleID - The target role(ID) to give to the user.