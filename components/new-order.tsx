"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconTrendingUp } from "@tabler/icons-react";

interface Pizza {
    name: string;
    price: number;
}

const NewOrder = () => {
// Get the active theme
    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [orderNumber, setOrderNumber] = useState("");
    const [pizzaSelect, setPizzaSelect] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [pizzaList, setPizzaList] = useState<Pizza[]>([]);

    useEffect(() => {
        setOrderNumber("ORD-" + Math.floor(Math.random() * 100000));
    }, []);

    const handlePizzaSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const pizzaName = selectedOption.value;
        const pizzaPrice = parseFloat(selectedOption.getAttribute("data-price") || "0");

        setPizzaSelect(pizzaName);
        setPizzaList([...pizzaList, { name: pizzaName, price: pizzaPrice }]);
        setTotalPrice(totalPrice + pizzaPrice);
    };

    const handleRemovePizza = (index: number) => {
        const removedPizza = pizzaList[index];
        setPizzaList(pizzaList.filter((_, i) => i !== index));
        setTotalPrice(totalPrice - removedPizza.price);
    };

    const handleSubmitOrder = () => {
        if (!customerName || !phoneNumber || pizzaList.length === 0) {
            alert("Please fill all fields before submitting.");
            return;
        }

        alert(`Order Submitted!\nName: ${customerName}\nPhone: ${phoneNumber}\nOrder Number: ${orderNumber}\nPizzas: ${pizzaList.map((p) => p.name).join(", ")}\nTotal Price: $${totalPrice}`);
    };

    const cardGradientClass = `bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs`;

    return (
        <Card className={`@container/card ${cardGradientClass}`}>
            <CardHeader>
                <CardTitle>New Order</CardTitle>
                <CardDescription>Fill the form to place a new order</CardDescription>
                <CardAction>
                    <Badge variant="outline">
                        <IconTrendingUp />
                        New
                    </Badge>
                </CardAction>
            </CardHeader>
            <div className="p-4">
                <div className="form-group mb-4">
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="customerName"
                        placeholder="Enter your name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-transparent"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        placeholder="(123) 456-7890" // US phone number format placeholder
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-transparent"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">Order Number:</label>
                    <input
                        type="text"
                        id="orderNumber"
                        value={orderNumber}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-transparent"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="pizzaSelect" className="block text-sm font-medium text-gray-700">Pizza Type:</label>
                    <select
                        id="pizzaSelect"
                        value={pizzaSelect}
                        onChange={handlePizzaSelect}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-transparent"
                        style={{ backgroundColor: 'transparent' }} // Add inline style for transparency
                    >
                        <option value="" disabled>
                            Select a pizza
                        </option>
                        <option value="Margherita" data-price="10">
                            Margherita - $10
                        </option>
                        <option value="Pepperoni" data-price="12">
                            Pepperoni - $12
                        </option>
                        <option value="Veggie" data-price="11">
                            Veggie - $11
                        </option>
                        <option value="BBQ Chicken" data-price="13">
                            BBQ Chicken - $13
                        </option>
                    </select>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">Total Price:</label>
                    <input
                        type="text"
                        id="totalPrice"
                        value={`$${totalPrice}`}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-transparent"
                    />
                </div>
                <button
                    onClick={handleSubmitOrder}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit Order
                </button>
                <ul id="pizzaList" className="mt-4 space-y-2">
                    {pizzaList.map((pizza, index) => (
                        <li key={index} className="flex justify-between items-center">
                            <span>{pizza.name} - ${pizza.price}</span>
                            <button
                                onClick={() => handleRemovePizza(index)}
                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    Total Price: ${totalPrice} <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                    Please review your order before submitting.
                </div>
            </CardFooter>
        </Card>
    );
};

export default NewOrder;