"use client"
import useCustomStore from '@/hooks/useCustomStore';
import { useMainStore } from '@/hooks/useMainStore';
import AddSetNumbers from "../components/addsetnumbers";
import UserOrders from '@/components/user-orders';
import NRow from "../components/nrow";


export default function Home() {
  const orders = useCustomStore(useMainStore, (state : any) => state.orders)
  const uniqOrder = useCustomStore(useMainStore, (state: any) => state.uniqOrder)
  const filterKeyword = useCustomStore(useMainStore, (state: any) => state.filterKeyword)
  const changeKeyword = useMainStore((state) => state.changeKeyword)
  const changeColor = useMainStore((state) => state.changeColor)
  const removeOrder = useMainStore((state) => state.removeOrder)


  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8">
      <div className='flex flex-row w-full justify-between'> 
          <div className='text-3xl font-semibold text-white'>ตารางการซื้อขาย </div>
          <div className="flex flex-row justify-self-end gap-2 items-center">
          {/* Dialog box */}
          <a href={"/"} className='btn btn-info btn-lg'  > <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/></svg> </a>
          <AddSetNumbers />
          
        </div>
      </div>

      <div className="flex justify-between gap-8 flex-wrap xl:flex-nowrap">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-info"> ตัวกรอง </label>
            <select className="select select-ghost w-full max-w-xs min-w-[200px]" defaultValue={filterKeyword} onChange={(ev) => changeKeyword(ev.target.value)}>
              <option disabled >เลือกรายชื่อที่จะแสดงผล</option>
              <option> ทั้งหมด</option>
              {
                uniqOrder?.map((el: any, index: number) => {
                  return (
                    <option key={index + "-" + el}> {el.name} </option>
                  )
                })
              }
            </select>
          </div>
          <div>
            {
              uniqOrder?.map((el: any, index: number) => {
                return (
                  <div className="flex" key={index + "_col"}>
                    <input type="color" className="input input-bordered input-secondary min-w-[80px] max-w-xs text-left " defaultValue={el.color} onChange={(ev) => changeColor({ color: ev.target.value }, el.name)} />
                    <input type="text" className="input input-bordered input-secondary min-w-[120px] max-w-xs text-left pr-2" value={el.name} readOnly={true} />
                    <div className='flex justify-center items-center px-4'>
                      <UserOrders username={el.name} hColor={el.color}/>
                    </div>
                  </div>
                )

              })
            }
          </div>


        </div>
        <div className="flex flex-col items-top">
          <div className="flex">
            <input type="text" value={"ชื่อ"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl" readOnly={true} />
            <input type="text" value={"หมายเลข"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl" readOnly={true} />
            <input type="text" value={"บน"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl" readOnly={true} />
            <input type="text" value={"โต๊ด"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl" readOnly={true} />
            <input type="text" value={"ล่าง"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl" readOnly={true} />
            <input type="text" value={"รวม"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl" readOnly={true} />
            <input type="text" value={""} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-[100px] text-center text-xl" readOnly={true} />
          </div>
          {
            filterKeyword == "ทั้งหมด" ?
              orders?.map((rowData: any, index: number) => {
                return (
                  <NRow rowData={rowData} key={rowData.id} index={index} removeOrder={removeOrder} />
                )
              })
              :
              orders?.filter((el: any) => el?.name == filterKeyword)?.map((rowData: any, index: number) => {
                return (
                  <NRow rowData={rowData} key={rowData.id} index={index} removeOrder={removeOrder} />
                )
              })
          }

        </div>
      </div>


    </main>


  )
}
