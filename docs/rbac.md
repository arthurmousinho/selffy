## RBAC (Role Based Access Control)

### Roles

- ```Admin```
- ```Free```
- ```Free```

### Permissions table

|                                 | Admin | Free  | Premium|
|---------------------------------|-------|-------|--------|
| **Access Admin Dashboard**      | ✅    | ❌    | ❌     |
| **Access User Dashboard**       | ✅    | ✅    | ✅     | 
| **Create User**                 | ✅    | ⚠️     | ⚠️      | x
| **Update User**                 | ✅    | ⚠️     | ⚠️      |x
| **Delete User**                 | ✅    | ⚠️    | ⚠️     |
| **List Users**                  | ✅    | ❌    | ❌     |
| **Search Users**                | ✅    | ❌    | ❌     |
| **Access Project Insights**     | ✅    | ✅    | ✅     |
| **Create Project**              | ✅    | ⚠️     | ✅     |
| **Update Project**              | ✅    | ⚠️     | ⚠️      |
| **Delete Project**              | ✅    | ⚠️     | ⚠️      |
| **Search Projects**             | ✅    | ❌    | ❌     |
| **Access Task Insights**        | ✅    | ⚠️     | ⚠️      |
| **Create Task**                 | ✅    | ⚠️     | ⚠️      |
| **Update Task**                 | ✅    | ⚠️     | ⚠️      |
| **Delete Task**                 | ✅    | ⚠️     | ⚠️      |
| **View Costs Insights**         | ✅    | ⚠️     | ⚠️      |
| **Add Costs**                   | ✅    | ⚠️     | ⚠️      |
| **Update Costs**                | ✅    | ⚠️     | ⚠️      |
| **Delete Costs**                | ✅    | ⚠️     | ⚠️      |

> ✅ = allowed  
> ❌ = not allowed  
> ⚠️ = allowed with limitations or specific conditions


#### Conditions

- ```Free```: Can only create 5 projects.
- ```Premium```: Can create unlimited projects.
- ```Free``` ```Premium```: Can only do actions related to themselves. Ex: Can update their user profile, but can't update other users profiles.