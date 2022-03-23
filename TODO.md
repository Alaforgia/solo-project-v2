<!-- POST to-do list -->

Get Server to post values from input field into the appropriate columns/tables.

SQL Query?

Sagas

Reducer?

Get newly created data to render in MyRecipe view

<!-- EDIT (UPDATE) to-do list -->

1. Create Edit component

2. OnClick handler in details view to EDIT VIEW

3. GET recipe detail information

4. Detail info in EDIT w/ Create view forms
   4.5 - handle onChange.
   4.6 - dispatch updated input value to reducer that holds the edit object (very much like our edit example from last week)

// (To-Do Tuesday 3/22) Update data appears in console. Not updating DB in Postico. Write // console.logs to narrow down error

5. SAVE button UPDATE call to DB
6. call to DB: Dispatch edit reducer object to Saga, then history.push to…? or not, up to you
   5.1. axios.put in saga

-- NOTES
IMG url upload?

rejectAuthenticated middleware
