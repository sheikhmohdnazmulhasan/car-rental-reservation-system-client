
const BookingCard = () => {
    const currentStatus = 'pending';



    return (
        <div>
            <div className="flex">
                <div className="flex-1 py-2 px-4 border-b border-gray-300">Nazmzm</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">1-20323-2</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">akakakaak</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">Lokksns snsn</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300 space-x-2">
                    <button className="border bg-gray-200 hover:bg-gray-300 transition-all hover:scale-105 px-1 rounded-md">View</button>
                    <button className="border px-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-all hover:scale-105 ">Approve</button>
                    {currentStatus === 'pending' && <button className="border bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-all hover:scale-105 px-1 ">Cenacle</button>}
                </div>
            </div>
        </div>
    );
};

export default BookingCard;