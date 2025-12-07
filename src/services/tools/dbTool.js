import Employee from "../../models/Employee.js";

// Very small, strict mapping from LLM-provided filter to mongoose filters
const transformFilter = (filter) => {
  const mongo = {};

  if (filter.department) mongo.department = filter.department;
  if (filter.minSalary) {
    if (filter.salaryOperator === 'gt') {
      mongo.salary = { $gt: filter.minSalary };
    } else {
      mongo.salary = { $gte: filter.minSalary };  // Default to >=
    }
  }
  if (filter.joinedLastMonth) {
    // ... (existing code)
  }
  if (filter.name) mongo.name = filter.name;
  if (filter.city) mongo.city = filter.city;

  return mongo;
};

export const handle = async (collection, operation, filter) => {
// We support only the `employees` collection in this demo
if (!collection || collection !== 'employees') {
return 'I can only query the employees collection in this demo.';
}


const mongoFilter = transformFilter(filter || {});


if (operation === 'count') {
const c = await Employee.countDocuments(mongoFilter);
return `${c} employee${c === 1 ? '' : 's'} match your query.`;
}


if (operation === 'list' || operation === 'find') {
const docs = await Employee.find(mongoFilter).limit(10).lean();
if (!docs || docs.length === 0) return 'No employees match your query.';


const names = docs.map(d => d.name).join(', ');
return `Found ${docs.length} employee${docs.length === 1 ? '' : 's'}: ${names}.`;
}


return 'Operation not supported in this demo.';
}


