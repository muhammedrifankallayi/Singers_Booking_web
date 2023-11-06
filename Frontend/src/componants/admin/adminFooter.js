import React from 'react'

function AdminFooter() {
    return (
        <div className="p-4 sm:ml-64">
            <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
                <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://www.linkedin.com/in/risvan-mp-27a579276/" class="hover:underline">Risvan</a>. All Rights Reserved.
                    </span>
                    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                        </li>
                        <li>
                            <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/risvan___/?igshid=OGQ5ZDc2ODk2ZA%3D%3D" class="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default AdminFooter