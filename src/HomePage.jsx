import React from "react";

const HomePage = () => {

    return (
        <React.Fragment>
            <div className="flex flex-col">
                <div className="overflow-hidden">
                    <img class="object-contain h-full w-full" src="/images/hospital_stock.jpg" alt="Hospital"/>
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                        <h1 className="text-3xl text-white">Welcome to the Hospital</h1>
                        <p class="mt-2 text-sm text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nihil voluptas a eum amet sapiente maxime impedit. Accusantium cupiditate dolorem ut magnam placeat deserunt. Praesentium assumenda mollitia facere, pariatur eos fuga officia cumque veniam ratione quisquam, enim autem labore debitis magnam quae obcaecati distinctio quos est. Officia dolorum excepturi ut animi aspernatur, saepe beatae culpa modi assumenda expedita numquam perspiciatis dignissimos quod unde quaerat! Voluptatibus tempore recusandae excepturi at necessitatibus ex accusamus, aperiam hic atque explicabo labore aliquid velit perferendis a dolore incidunt qui! Dicta temporibus exercitationem veniam, aliquid sed assumenda beatae consequuntur ratione dolorem accusamus expedita reiciendis odio mollitia!</p>
                    </div>
                </div>
                <div className="basis-auto"></div>
            </div>
        </React.Fragment>
    );
}

export default HomePage;