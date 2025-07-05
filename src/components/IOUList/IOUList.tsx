import React from 'react';
import { IOUCard } from './IOUCard';
import { NewIOUForm } from '../NewIOU/NewIOUForm';
import obi from "../../assets/obi.png"
import ma from "../../assets/ma'chae.png"
import andre from "../../assets/andre.png"




export function IOUList() {
  const mockData = [
    { id: 1, name: 'Obi Maduka-Ugwu', amount: 500, date: '2024-03-15', isOwed: true, reliability: 49, isPending: false, image: obi },
    { id: 2, name: 'MaChae Garland', amount: 750, date: '2024-03-14', isOwed: true, reliability: 76, isPending: true, image: ma },
    { id: 3, name: 'Andre Sadler', amount: -450, date: '2024-03-13', isOwed: false, reliability: 82, isPending: false, image: andre },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Recent IOUs Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-6">
          Recent IOUs
        </h2>
        <div className="space-y-5">
          {mockData.map((iou) => (
            <IOUCard
              key={iou.id}
              name={iou.name}
              amount={iou.amount}
              date={iou.date}
              isOwed={iou.isOwed}
              reliability={iou.reliability}
              isPending={iou.isPending}
              image={iou.image} // Pass the image

            />
          ))}
        </div>
      </div>

      {/* New IOU Form Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-6">
          Create a New IOU
        </h2>
        <NewIOUForm />
      </div>
    </div>
  );
}
