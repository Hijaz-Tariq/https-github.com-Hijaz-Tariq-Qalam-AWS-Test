// // // app / (browse) / (home) / admin / coursesList / page.tsx



// import { PrismaClient } from '@prisma/client';
// import { db } from '@/lib/db';

// interface ClassCategoryData {
//     className: string;
//     departmentName?: string;
//     categoryName: string;
//     hasCourses: boolean;
// }

// interface Props {
//     data: ClassCategoryData[];
// }

// const fetchCoursesData = async (): Promise<ClassCategoryData[]> => {
//     const courses = await db.course.findMany({
//         include: {
//             class: true,
//             category: true,
//             departments: true,
//         },
//     });

//     return courses.map(course => ({
//         className: course.class?.name || 'Unknown',
//         departmentName: course.departments.length > 0 ? course.departments.map(dept => dept.name).join(', ') : undefined,
//         categoryName: course.category?.name || 'Unknown',
//         hasCourses: true,
//     }));
// };

// const fetchAllClassesAndCategories = async () => {
//     const classes = await db.class.findMany({
//         include: {
//             department: true,
//         },
//     });

//     const categories = await db.category.findMany();

//     return { classes, categories };
// };

// export default async function CoursesPage() {
//     const coursesData = await fetchCoursesData();
//     const { classes, categories } = await fetchAllClassesAndCategories();

//     // Create a full list of class names and department names
//     const classNames = classes.map(cls => cls.name);
//     const departmentNames = classes.flatMap(cls => cls.department.map(dept => dept.name));
//     const allClassDeptNames = [
//         ...new Set([...classNames, ...departmentNames])
//     ];

//     // Create a map of category names
//     const categoryNames = categories.map(cat => cat.name);

//     // Create full matrix data
//     const groupedData: Record<string, Record<string, string>> = {};

//     allClassDeptNames.forEach(classOrDept => {
//         groupedData[classOrDept] = {};
//         categoryNames.forEach(cat => {
//             groupedData[classOrDept][cat] = '✘'; // Default to no courses
//         });
//     });

//     // Update groupedData based on available courses
//     coursesData.forEach(item => {
//         const key = item.departmentName ? item.className : item.className;
//         // const key = item.departmentName ? `${item.className} / ${item.departmentName}` : item.className;
//         if (groupedData[key]) {
//             groupedData[key][item.categoryName] = '✓';
//         }
//     });

//     return (
//         <div>
//             <h1>Classes and Categories</h1>

//             <h2>Classes 1-10</h2>
//             <table border={1}>
//                 <thead>
//                     <tr>
//                         <th>Class/Category</th>
//                         {categoryNames.map((cat) => (
//                             <th key={cat}>{cat}</th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {classNames.map((className) => (
//                         <tr key={className}>
//                             <td>{className}</td>
//                             {categoryNames.map((cat) => (
//                                 <td key={cat}>{groupedData[className][cat] || '✘'}</td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>


//         </div>
//     );
// }


// //-----------------------------------------------


// import { PrismaClient } from '@prisma/client';
// import { db } from '@/lib/db';
// import React from 'react';

// interface ClassCategoryData {
//     className: string;
//     departmentName?: string;
//     categoryName: string;
//     hasCourses: boolean;
// }

// interface Props {
//     data: ClassCategoryData[];
// }

// const fetchCoursesData = async (): Promise<ClassCategoryData[]> => {
//     const courses = await db.course.findMany({
//         include: {
//             class: true,
//             category: true,
//             departments: true,
//         },
//     });

//     return courses.map(course => ({
//         className: course.class?.name || 'Unknown',
//         departmentName: course.departments.length > 0 ? course.departments.map(dept => dept.name).join(', ') : undefined,
//         categoryName: course.category?.name || 'Unknown',
//         hasCourses: true,
//     }));
// };

// const fetchAllClassesAndCategories = async () => {
//     const classes = await db.class.findMany({
//         include: {
//             department: true,
//         },
//     });

//     const categories = await db.category.findMany();

//     return { classes, categories };
// };

// export default async function CoursesPage() {
//     const coursesData = await fetchCoursesData();
//     const { classes, categories } = await fetchAllClassesAndCategories();

//     // Create a map of category names
//     const categoryNames = categories.map(cat => cat.name);

//     // Create full matrix data
//     const groupedData: Record<string, Record<string, string>> = {};

//     classes.forEach(cls => {
//         // Initialize data for the class
//         groupedData[cls.name] = {};
//         categoryNames.forEach(cat => {
//             groupedData[cls.name][cat] = '✘'; // Default to no courses
//         });

//         // Initialize data for each department under the class
//         cls.department.forEach(dept => {
//             groupedData[`${cls.name} / ${dept.name}`] = {};
//             categoryNames.forEach(cat => {
//                 groupedData[`${cls.name} / ${dept.name}`][cat] = '✘'; // Default to no courses
//             });
//         });
//     });

//     // Update groupedData based on available courses
//     coursesData.forEach(item => {
//         if (item.departmentName) {
//             // Ensure the department-specific entry exists
//             const deptKey = `${item.className} / ${item.departmentName}`;
//             if (groupedData[deptKey]) {
//                 groupedData[deptKey][item.categoryName] = '✓';
//             }
//         } else {
//             // Ensure the class-specific entry exists
//             if (groupedData[item.className]) {
//                 groupedData[item.className][item.categoryName] = '✓';
//             }
//         }
//     });

//     return (
//         <div>
//             <h1>Classes and Categories</h1>

//             <h2>Classes 1-10</h2>
//             <table border={1}>
//                 <thead>
//                     <tr>
//                         <th>Class/Category</th>
//                         {categoryNames.map((cat) => (
//                             <th key={cat}>{cat}</th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {classes
//                         .filter(cls => !cls.name.includes('الحادي عشر') && !cls.name.includes('الثاني عشر') && !cls.name.includes('جامعي'))
//                         .map((classItem) => (
//                             <tr key={classItem.name}>
//                                 <td>{classItem.name}</td>
//                                 {categoryNames.map((cat) => (
//                                     <td key={cat}>{groupedData[classItem.name][cat] || '✘'}</td>
//                                 ))}
//                             </tr>
//                         ))}
//                 </tbody>
//             </table>

//             <h2>Classes 11 and Beyond</h2>
//             <table border={1}>
//                 <thead>
//                     <tr>
//                         <th>Class/Department</th>
//                         {categoryNames.map((cat) => (
//                             <th key={cat}>{cat}</th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {classes
//                         .filter(cls => cls.name.includes('الحادي عشر') || cls.name.includes('الثاني عشر') || cls.name.includes('جامعي'))
//                         .map((classItem) => (
//                             <React.Fragment key={classItem.name}>
//                                 <tr>
//                                     <td><>
//                                         {classItem.department.map((department) => {
//                                        id: department.id;
//                                        name: department.name
//                                     })}
//                                     </>
//                                     </td>
//                                     {categoryNames.map((cat) => (
//                                         <td key={cat}>{groupedData[classItem.name][cat] || '✘'}</td>
//                                     ))}
//                                 </tr>
//                                 {classItem.department.map(dept => (
//                                     <tr key={`${classItem.name}/${dept.name}`}>
//                                         <td>-- {dept.name}</td>
//                                         {categoryNames.map((cat) => (
//                                             <td key={cat}>
//                                                 {groupedData[`${classItem.name} / ${dept.name}`][cat] || '✘'}
//                                                 </td>
//                                         ))}
//                                     </tr>
//                                 ))}
//                             </React.Fragment>
//                         ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


// // // //-------------------------


// // // // app/(browse)/(home)/admin/coursesList/page.tsx

// // // import { PrismaClient } from '@prisma/client';
// // // import { db } from '@/lib/db';

// // // interface ClassCategoryData {
// // //     className: string;
// // //     departmentName?: string;
// // //     categoryName: string;
// // //     hasCourses: boolean;
// // // }

// // // interface Props {
// // //     data: ClassCategoryData[];
// // // }

// // // const fetchCoursesData = async (): Promise<ClassCategoryData[]> => {
// // //     const courses = await db.course.findMany({
// // //         include: {
// // //             class: true,
// // //             category: true,
// // //             departments: true,
// // //         },
// // //     });

// // //     return courses.flatMap(course => {
// // //         if (course.departments.length > 0) {
// // //             return course.departments.map((dept, index) => ({
// // //                 className: `${course.class?.name} - ${dept} ${index + 1}`,
// // //                 categoryName: course.category?.name || 'Unknown',
// // //                 hasCourses: true,
// // //             }));
// // //         }
// // //         return [{
// // //             className: course.class?.name || 'Unknown',
// // //             categoryName: course.category?.name || 'Unknown',
// // //             hasCourses: true,
// // //         }];
// // //     });
// // // };

// // // const fetchAllClassesAndCategories = async () => {
// // //     const classes = await db.class.findMany({
// // //         include: {
// // //             department: true,
// // //         },
// // //     });

// // //     const categories = await db.category.findMany();

// // //     return { classes, categories };
// // // };

// // // export default async function CoursesPage() {
// // //     const coursesData = await fetchCoursesData();
// // //     const { classes, categories } = await fetchAllClassesAndCategories();

// // //     // Create a map of all class names and their departments
// // //     const classDeptNames: string[] = [];
// // //     classes.forEach(cls => {
// // //         if (cls.department.length > 0) {
// // //             cls.department.forEach((dept, index) => {
// // //                 classDeptNames.push(`${cls.name} /${dept} ${index + 1}`);
// // //             });
// // //         } else {
// // //             classDeptNames.push(cls.name);
// // //         }
// // //     });

// // //     // Create a map of category names
// // //     const categoryNames = categories.map(cat => cat.name);

// // //     // Create full matrix data
// // //     const groupedData: Record<string, Record<string, string>> = {};

// // //     classDeptNames.forEach(classDept => {
// // //         groupedData[classDept] = {};
// // //         categoryNames.forEach(cat => {
// // //             groupedData[classDept][cat] = '✘'; // Default to no courses
// // //         });
// // //     });

// // //     // Update groupedData based on available courses
// // //     coursesData.forEach(item => {
// // //         const key = item.className;
// // //         if (groupedData[key]) {
// // //             groupedData[key][item.categoryName] = '✓';
// // //         }
// // //     });

// // //     return (
// // //         <div>
// // //             <h1>Classes and Categories</h1>

// // //             <h2>All Classes and Departments</h2>
// // //             <table border={1}>
// // //                 <thead>
// // //                     <tr>
// // //                         <th>Class/Department/Category</th>
// // //                         {categoryNames.map((cat) => (
// // //                             <th key={cat}>{cat}</th>
// // //                         ))}
// // //                     </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                     {Object.keys(groupedData).map((classDept) => (
// // //                         <tr key={classDept}>
// // //                             <td>{classDept}</td>
// // //                             {categoryNames.map((cat) => (
// // //                                 <td key={cat}>{groupedData[classDept][cat] || '✘'}</td>
// // //                             ))}
// // //                         </tr>
// // //                     ))}
// // //                 </tbody>
// // //             </table>
// // //         </div>
// // //     );
// // // }



// // //------------------------------------------------------------

// // // import React from 'react';

// // // // Example static data for demonstration purposes
// // // const classes = [
// // //   "الصف الاول الابتدائي",
// // //   "الصف الثاني الابتدائي",
// // //   "الصف الثالث الابتدائي",
// // //   "الصف الرابع الابتدائي",
// // //   "الصف الخامس الابتدائي",
// // //   "الصف السادس الابتدائي",
// // //   "الصف السابع",
// // //   "الصف الثامن",
// // //   "الصف التاسع",
// // //   "الصف العاشر",
// // //   "الصف الحادي عشر",
// // //   "الصف الثاني عشر",
// // //   "جامعي"
// // // ];

// // // const departments = [
// // //   "أدبي (علوم إنسانية)",
// // //   "تجاري",
// // //   "تكنولوجي",
// // //   "زراعي",
// // //   "شرعي",
// // //   "صناعي",
// // //   "علمي",
// // //   "فندقي واقتصاد منزلي",
// // //   "غير ذلك"
// // // ];

// // // const categories = [
// // //   "رياضيات",
// // //   "لغات",
// // //   "فيزياء",
// // //   "كيمياء",
// // //   "ادارة",
// // //   "تكنولوجيا",
// // //   "اخرى"
// // // ];

// // // const buildRows = () => {
// // //   const rows = [];

// // //   // Classes 1-10
// // //   for (let i = 0; i < 10; i++) {
// // //     rows.push({ className: classes[i], isDepartment: false });
// // //   }

// // //   // Classes 11-13 with departments
// // //   for (let i = 10; i < 13; i++) {
// // //     for (const dept of departments) {
// // //       rows.push({ className: `${classes[i]} - ${dept}`, isDepartment: true });
// // //     }
// // //   }

// // //   return rows;
// // // };

// // // const CoursesPage: React.FC = () => {
// // //   const rows = buildRows();

// // //   return (
// // //     <div>
// // //       <h1>Classes and Categories</h1>

// // //       <table border={1}>
// // //         <thead>
// // //           <tr>
// // //             <th>Class/Department</th>
// // //             {categories.map((cat) => (
// // //               <th key={cat}>{cat}</th>
// // //             ))}
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {rows.map((row, index) => (
// // //             <tr key={index}>
// // //               <td>{row.className}</td>
// // //               {categories.map((cat, catIndex) => (
// // //                 <td key={catIndex}>✘</td>
// // //                 //{/* Placeholder for now */}
// // //               ))}
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // };

// // // export default CoursesPage;

// // //--------------------------------------------

// // import { db } from '@/lib/db';
// // import { Course, Department, Category } from '@prisma/client';
// // // Define interfaces for TypeScript
// // interface Class {
// //     id: string;
// //     name: string;
// //     departments: { id: string; name: string }[];
// // }

// // // interface Category {
// // //     name: string;
// // // }

// // // interface Course {
// // //     classId: string | null;
// // //     categoryId: string | null;
// // //     departments: { id: string; name: string }[];
// // // }

// // interface RowData {
// //     className: string;
// //     isDepartment: boolean;
// //     categories: { [key: string]: string };
// // }

// // // const fetchClasses = async (): Promise<Class[]> => {
// // //     return db.class.findMany({
// // //         include: {
// // //             department: true,
// // //         },
// // //     });
// // // };

// // const fetchCategories = async (): Promise<Category[]> => {
// //     return db.category.findMany();
// // };

// // const fetchCourses = async (): Promise<Course[]> => {
// //     return db.course.findMany({
// //         include: {
// //             category: true,
// //             class: true,
// //             departments: true,
// //         },
// //     });
// // };

// // const buildRows = (classes: Class[], categories: Category[], courses: Course[]): RowData[] => {
// //     const rows: RowData[] = [];

// //     // Classes 1-10
// //     classes.forEach(cls => {
// //         const hasDepartments = cls.departments && cls.departments.length > 0;

// //         if (!hasDepartments) { // Only regular classes, not departments
// //             const row = {
// //                 className: cls.name,
// //                 isDepartment: false,
// //                 categories: {}
// //             };

// //             categories.forEach(cat => {
// //                 row.categories[cat.name] = '✘'; // Default to no courses
// //             });

// //             rows.push(row);
// //         } else { // For classes with departments (11-13)
// //             cls.departments.forEach(dept => {
// //                 const row = {
// //                     className: `${cls.name} - ${dept.name}`,
// //                     isDepartment: true,
// //                     categories: {}
// //                 };

// //                 categories.forEach(cat => {
// //                     row.categories[cat.name] = '✘'; // Default to no courses
// //                 });

// //                 rows.push(row);
// //             });
// //         }
// //     });

// //     // Update rows with actual course data
// //     courses.forEach(course => {
// //         const className = classes.find(cls => cls.id === course.classId)?.name;
// //         const departmentName = course.departments.map(dept => dept.name).join(' - ');

// //         rows.forEach(row => {
// //             if (row.className === `${className} - ${departmentName}` || row.className === className) {
// //                 categories.forEach(cat => {
// //                     if (course.categoryId) {
// //                         const category = categories.find(c => c.id === course.categoryId);
// //                         if (category?.name === cat.name) {
// //                             row.categories[cat.name] = '✓';
// //                         }
// //                     }
// //                 });
// //             }
// //         });
// //     });

// //     return rows;
// // };

// // // Server Component
// // const CoursesPage = async () => {
// //     const classes = await fetchClasses();
// //     const categories = await fetchCategories();
// //     const courses = await fetchCourses();

// //     const rows = buildRows(classes, categories, courses);

// //     return (
// //         <div>
// //             <h1>Classes and Categories</h1>

// //             <table border={1}>
// //                 <thead>
// //                     <tr>
// //                         <th>Class/Department</th>
// //                         {categories.map((cat) => (
// //                             <th key={cat.name}>{cat.name}</th>
// //                         ))}
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {rows.map((row, index) => (
// //                         <tr key={index}>
// //                             <td>{row.className}</td>
// //                             {categories.map((cat) => (
// //                                 <td key={cat.name}>{row.categories[cat.name]}</td>
// //                             ))}
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </div>
// //     );
// // };

// // export default CoursesPage;

// //--------------------------------------------------------------

// "use client"
// import React, { useState, useEffect } from 'react';

// const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6', 'Category 7'];
// const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Class 13'];
// const departments = ['Department 1', 'Department 2', 'Department 3', 'Department 4', 'Department 5', 'Department 6', 'Department 7', 'Department 8', 'Department 9'];

// const CoursesPage = () => {
//   const [table, setTable] = useState<string[][]>([]);

//   useEffect(() => {
//     const newTable: string[][] = [];
//     // Add an empty row for the header
//     newTable.push([]);
//     // Add the categories as the first row
//     newTable[0].push('Category');
//     categories.forEach((category) => {
//       newTable[0].push(category);
//     });
//     // Add the classes and departments as the remaining rows
//     classes.forEach((className) => {
//       const row: string[] = [];
//       row.push(className);
//       const departmentCells: string[] = []; // Create an array for department ✓/✘ marks
//       departments.forEach((department) => {
//         departmentCells.push('✓'); // Replace with your logic to determine ✓ or ✘
//       });
//       // **Crucially, spread the departmentCells array into the row:**
//       row.push(...departmentCells);
//       newTable.push(row);
//     });
//     setTable(newTable);
//   }, []);

//   return (
//     <table className="table table-bordered table-striped">
//       <thead>
//         <tr>
//           {table[0].map((cell, cellIndex) => (
//             <th key={cellIndex}>{cell}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {table.slice(1).map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {row.map((cell, cellIndex) => (
//               <td key={cellIndex}>
//                 {Array.isArray(cell) ? (
//                   cell.map((item, itemIndex) => (
//                     <div key={itemIndex}>{item}</div>
//                   ))
//                 ) : (
//                   cell
//                 )}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default CoursesPage;



//---------------------------------------------------


