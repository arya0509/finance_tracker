export default function MonthCard({groupedMonths,year,getTransFromID}){
    function clicked(month_id){
        getTransFromID(month_id);
    }
    return (
        <div>
            <h1 className='text-2xl font-bold'>{year}</h1>
            <div className='flex flex-row'>
                {groupedMonths[year].map((month,index)=>{
                    return(
                        <div key={index} className='my-5 bg-gray-300 h-24 w-56 rounded flex justify-center items-center flex-col mx-3 hover:bg-slate-200' >
                            <button type="button" className="h-full w-full" onClick={()=>clicked(month.month_id)}>
                                <h1 className='text-2xl font-bold'>{month.month_name}</h1>
                            </button>
                        </div>
                        )
                })}
            </div>
        </div>
    )
}