// // import { redirect } from "next/navigation";

// // import { db } from "@/lib/db";

// // import { DataTable } from "./_components/data-table";
// // import { columns } from "./_components/columns";
// // import { currentRole } from "@/lib/auth";

// // const CoursesPage = async () => {
// //     const role = await currentRole()


// //     if (role !== "ADMIN") {
// //         return redirect("/");
// //     }

// //     const classes = await db.class.findMany({
// //         include: {
// //             courses: true,
// //             department: true,
// //             category: true,
// //         }
// //     });
// // const department = await db.department.findMany({

// // })
// //     return (
// //         <div className="p-6">
// //             <DataTable columns={columns} data={classes} department={department} />
// //         </div>
// //     );
// // }

// // export default CoursesPage;

// //-----------------------------------------------------------

// "use client"
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Search, Eye } from "lucide-react";

// const orderData = [
//     { name: "الصف الاول الابتدائي", customer: "John Doe", total: 235.4, status: "Delivered", date: "2023-07-01" },
//     { name: "الصف الثاني الابتدائي", customer: "Jane Smith", total: 412.0, status: "Processing", date: "2023-07-02" },
//     { name: "الصف الثالث الابتدائي", customer: "Bob Johnson", total: 162.5, status: "Shipped", date: "2023-07-03" },
//     { name: "الصف الرابع الابتدائي", customer: "Alice Brown", total: 750.2, status: "Pending", date: "2023-07-04" },
//     { name: "الصف الخامس الابتدائي", customer: "Charlie Wilson", total: 95.8, status: "Delivered", date: "2023-07-05" },
//     { name: "الصف السادس الابتدائي", customer: "Eva Martinez", total: 310.75, status: "Processing", date: "2023-07-06" },
//     { name: "الصف السابع", customer: "Davname Lee", total: 528.9, status: "Shipped", date: "2023-07-07" },
//     { name: "الصف الثامن", customer: "Grace Taylor", total: 189.6, status: "Delivered", date: "2023-07-08" },
//     { name: "الصف التاسع", customer: "John Doe", total: 235.4, status: "Delivered", date: "2023-07-01" },
//     { name: "الصف العاشر", customer: "Jane Smith", total: 412.0, status: "Processing", date: "2023-07-02" },
//     { name: "الصف الحادي عشر ", customer: "Bob Johnson", total: 162.5, status: "Shipped", date: "2023-07-03" },
//     { name: "الصف الثاني عشر ", customer: "Alice Brown", total: 750.2, status: "Pending", date: "2023-07-04" },
//     { name: " جامعي ", customer: "Charlie Wilson", total: 95.8, status: "Delivered", date: "2023-07-05" },
// ];

// const OrdersTable = () => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filteredOrders, setFilteredOrders] = useState(orderData);

//     const handleSearch = (e: any) => {
//         const term = e.target.value.toLowerCase();
//         setSearchTerm(term);
//         const filtered = orderData.filter(
//             (order) => order.name.toLowerCase().includes(term) || order.customer.toLowerCase().includes(term)
//         );
//         setFilteredOrders(filtered);
//     };

//     return (
//         <motion.div
//             className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//         >
//             <div className='flex justify-between items-center mb-6'>
//                 <h2 className='text-xl font-semibold text-gray-100'>Classes List</h2>
//                 <div className='relative'>
//                     <input
//                         type='text'
//                         placeholder='Search classes...'
//                         className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
//                         value={searchTerm}
//                         onChange={handleSearch}
//                     />
//                     <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
//                 </div>
//             </div>

//             <div className='overflow-x-auto'>
//                 <table className='min-w-full divide-y divide-gray-700'>
//                     <thead>
//                         <tr>
//                             <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
//                                 class name
//                             </th>
//                             <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
//                             رياضيات
//                             </th>
//                             <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
//                             لغات
//                             </th>
//                             <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
//                             فيزياء
//                             </th>
//                             <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
//                             كيمياء
//                             </th>
//                             <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
//                             ادارة
//                             </th>
//                             <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
//                             تكنولوجيا
//                             </th>
//                             <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
//                             اخرى
//                             </th>
//                         </tr>
//                     </thead>

//                     <tbody className='divide divide-gray-700'>
//                         {filteredOrders.map((order) => (
//                             <motion.tr
//                                 key={order.name}
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ duration: 0.3 }}
//                             >
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
//                                     {order.name}
//                                 </td>
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
//                                     {order.customer}
//                                 </td>
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
//                                     ${order.total.toFixed(2)}
//                                 </td>
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
//                                     <span
//                                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === "Delivered"
//                                             ? "bg-green-100 text-green-800"
//                                             : order.status === "Processing"
//                                                 ? "bg-yellow-100 text-yellow-800"
//                                                 : order.status === "Shipped"
//                                                     ? "bg-blue-100 text-blue-800"
//                                                     : "bg-red-100 text-red-800"
//                                             }`}
//                                     >
//                                         {order.status}
//                                     </span>
//                                 </td>
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{order.date}</td>
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
//                                     <button className='text-indigo-400 hover:text-indigo-300 mr-2'>
//                                         <Eye size={18} />
//                                     </button>
//                                 </td>
//                             </motion.tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </motion.div>
//     );
// };
// export default OrdersTable;


// // // app / (browse) / (home) / admin / coursesList / page.tsx



// import { Department } from '@prisma/client';
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
//     const departments = await db.department.findMany()
//     return { classes, categories, departments };
// };

// export default async function CoursesPage() {
//     const coursesData = await fetchCoursesData();
//     const { classes, categories, departments } = await fetchAllClassesAndCategories();

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
//         if (groupedData[key]) {
//             groupedData[key][item.categoryName] = '✓';
//         }
//     });

//     // Create array of classes with row numbers
//     const classNamesWithRowNumbers = classNames.map((className, index) => ({
//         name: className,
//         rowNumber: index + 1 // Row numbers starting from 1
//     }));

//     const depts =
//         departments.map((department => department.name))

//     return (
//         <div>
//             <h1>Classes and Categories</h1>
//             {depts.toString()}
//             <h2>Classes 1-10</h2>
//             <table border={1}>
//                 <thead>
//                     <tr>
//                         <th>Row #</th>
//                         <th>Class/Category</th>
//                         {categoryNames.map((cat) => (
//                             <th key={cat}>{cat}</th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {classNamesWithRowNumbers.map(({ name, rowNumber }) => (
//                         rowNumber <= 10 ?
//                             <tr key={name}>
//                                 <td>{rowNumber}</td> {/* Display row number */}
//                                 <td>{name}</td>
//                                 {categoryNames.map((cat) => (
//                                     <td key={cat}>{groupedData[name][cat] || '✘'}</td>
//                                 ))}
//                             </tr>
//                             : <tr key={name}>
//                                 <td>{rowNumber}</td> {/* Display row number */}
//                                 <td>{name && (depts.map((departments) => (
//                                     <tr key={departments}>{departments}</tr>
//                                 )))}</td>
//                                 {/* <td>{name}/{depts[0]}</td> */}
//                                 {categoryNames.map((cat) => (
//                                     <td key={cat}>{groupedData[name][cat] || '✘'}</td>
//                                 ))}
//                             </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


//---------------------------------

// import { Department } from '@prisma/client';
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
//     const departments = await db.department.findMany();
//     return { classes, categories, departments };
// };

// export default async function CoursesPage() {
//     const coursesData = await fetchCoursesData();
//     const { classes, categories, departments } = await fetchAllClassesAndCategories();

//     // Separate classes and departments
//     const classNames = classes.map(cls => cls.name);
//     const classDepartments = classes.flatMap(cls => cls.department.map(dept => dept.name));

//     // Create a map of category names
//     const categoryNames = categories.map(cat => cat.name);

//     // Create a map for holding the data
//     const groupedData: Record<string, Record<string, string>> = {};

//     classNames.forEach(className => {
//         groupedData[className] = {};
//         categoryNames.forEach(cat => {
//             groupedData[className][cat] = '✘'; // Default to no courses
//         });
//     });

//     departments.forEach(dept => {
//         groupedData[dept.name] = {};
//         categoryNames.forEach(cat => {
//             groupedData[dept.name][cat] = '✘'; // Default to no courses
//         });
//     });

//     // Update groupedData based on available courses
//     coursesData.forEach(item => {
//         if (item.departmentName) {
//             item.departmentName.split(', ').forEach(dept => {
//                 if (groupedData[dept]) {
//                     groupedData[dept][item.categoryName] = '✓';
//                 }
//             });
//         } else if (groupedData[item.className]) {
//             groupedData[item.className][item.categoryName] = '✓';
//         }
//     });

//     // Create array of classes with row numbers
//     const classNamesWithRowNumbers = classNames.map((className, index) => ({
//         name: className,
//         rowNumber: index + 1 // Row numbers starting from 1
//     }));

//     // Add departments for classes beyond 10
//     const departmentsData = departments.map(dept => dept.name);

//     return (
//         <div>
//             <h1>Classes and Categories</h1>
//             <h2>Classes 1-10</h2>
//             <table border={1}>
//                 <thead>
//                     <tr>
//                         <th>Row #</th>
//                         <th>Class/Category</th>
//                         {categoryNames.map((cat) => (
//                             <th key={cat}>{cat}</th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {classNamesWithRowNumbers.map(({ name, rowNumber }) => (
//                         rowNumber <= 10 ? (
//                             <React.Fragment key={name}>
//                                 <tr>
//                                     <td>{rowNumber}</td>
//                                     <td>{name}</td>
//                                     {categoryNames.map((cat) => (
//                                         <td key={cat}>{groupedData[name][cat] || '✘'}</td>
//                                     ))}
//                                 </tr>
//                             </React.Fragment>
//                         ) : (
//                             <React.Fragment key={name}>
//                                 <tr>
//                                     <td>{rowNumber}</td>
//                                     <td>{name}</td>
//                                     {categoryNames.map((cat) => (
//                                         <td key={cat}>{'✘'}</td> // No data for the class itself
//                                     ))}
//                                 </tr>
//                                 {/* Render sub-rows for departments */}
//                                 {departmentsData.map(dept => (
//                                     <tr key={`${name}-${dept}`} style={{ paddingLeft: '20px' }}>
//                                         <td></td> {/* Empty cell for row number */}
//                                         <td>{dept}</td>
//                                         {categoryNames.map((cat) => (
//                                             <td key={`${dept}-${cat}`}>
//                                                 {groupedData[dept] ? groupedData[dept][cat] || '✘' : '✘'}
//                                             </td>
//                                         ))}
//                                     </tr>
//                                 ))}
//                             </React.Fragment>
//                         )
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


//------------------------------------------------------------the one before works fine 
import { Category, Class, Department } from "@prisma/client";
import { db } from "@/lib/db";

interface CoursesList {
    categories: Category[];
    categoryId: string;
    class: Class[];
    classId: string;
    department: Department[];

}

const CoursesPage = async () => {
    const courses = await db.course.findMany({

        include: {
            departments: true,
            class: true,
            category: true
        }
    })
    const categories = await db.category.findMany({});
    const classes = await db.class.findMany({});
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {categories.map((category) => (
                            <th key={category.name}>{category.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <>
                        {classes.map((cls) => (cls.classIndex > 10 ? <tr key={cls.name}><td>{cls.name}YOU SHOULD WORK HERE</td></tr> :
                            <tr key={cls.name}><td>{cls.name}</td></tr>
                        ))}
                    </>

                </tbody>
            </table>
        </div>
    );
}

export default CoursesPage;
