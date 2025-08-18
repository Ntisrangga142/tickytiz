import React, { useState } from 'react'
import ProfileSetting from './ProfileSetting'
import ProfileOrder from './ProfileOrder'

function ProfileMain() {
  const [activeTab, setActiveTab] = useState('settings') // default tab aktif

  return (
    <main className="bg-[#A0A3BD33] py-[50px] px-[75px] flex flex-col gap-[30px] justify-center lg:flex-row items-center lg:items-start">
      <aside className="h-[783px] w-[328px] bg-[#FFFFFF] rounded-[24px] flex flex-col">
        <div className="flex justify-between px-[50px] pt-[50px] pb-[30px]">
          <div><p className="text-[16px] tracking-[0.75px] font-normal text-[#4E4B66]">INFO</p></div>
          <div><button><img src="../assets/imgs/icon/dot-row.png" alt="dot-row" /></button></div>
        </div>
        <div className="flex flex-col justify-between items-center gap-[20px] pb-[50px] border-b border-[#DEDEDE]">
          <div className="w-[136px] h-[136px] rounded-full overflow-hidden"><img className="object-cover w-full h-full" src="../assets/imgs/profile.png" alt="profile" /></div>
          <div><h1 className="font-semibold text-[20px] tracking-[0.75px] text-[#14142B]">Jonas El Rodriguez</h1></div>
          <div><h2 className="font-normal text-[14px] tracking-[0.75px] text-[#4E4B66]">Moviegoers</h2></div>
        </div>
        <div className="flex flex-col px-[50px] pt-[50px] gap-[30px] pb-[50px]">
          <div><h2 className="font-semibold text-[16px] tracking-[0.75px] text-[#4E4B66]">Loyalty Points</h2></div>
          <div className="w-[250px] h-[125px] relative overflow-hidden bg-[#1D4ED8] shadow-[0_8px_32px_#5F2EEA] rounded-[16px]">
            <img src="../assets/imgs/profile/eva_star-fill.png" alt="star" className="w-[51px] h-[51px] absolute right-0 top-0" />
            <img src="../assets/imgs/profile/Ellipse 13.png" alt="elipse-1" className="w-[122px] h-[122px] absolute right-[-50px] top-[-30px]" />
            <img src="../assets/imgs/profile/Ellipse 13.png" alt="elipse-2" className="w-[122px] h-[122px] absolute right-[-30px] top-[-60px]" />
            <h1 className="text-[18px] font-[700] tracking-[0.75px] text-white absolute top-[20px] left-[20px]">Moviegoers</h1>
            <h2 className="text-[24px] font-[600] tracking-[0.75px] text-white absolute top-[70px] left-[20px]">320</h2>
            <p className="text-[10px] font-[400] tracking-[0.75px] text-white absolute top-[85px] left-[70px]">points</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[20px]">
          <p className="text-[16px] font-[400] tracking-[0.25px] text-[#4E4B66]">180 points become a master</p>
          <div className="w-[248px] h-[16px] bg-[#F5F6F8] shadow-[inset_0_2px_4px_0_#11111129] rounded-[8px] relative">
            <div className="absolute top-0 left-0 bg-[#1D4ED8] w-[126px] h-[16px] rounded-[16px]"></div>
          </div>
        </div>
      </aside>

      <article className="flex flex-col gap-[50px] w-full max-w-[800px]">
        <div className="flex bg-[#FFFFFF] w-full h-[84px] rounded-[16px] gap-[20px] items-center px-[35px]">
          <button
            onClick={() => setActiveTab('settings')}
            className={`text-[18px] font-[400] tracking-[0.75px] ${
              activeTab === 'settings' ? 'border-b-2 border-b-[#1D4ED8] text-[#14142B]' : 'text-[#AAAAAA]'
            } h-full flex items-center`}
          >
            Account Settings
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`text-[18px] font-[400] tracking-[0.75px] ${
              activeTab === 'orders' ? 'border-b-2 border-b-[#1D4ED8] text-[#14142B]' : 'text-[#AAAAAA]'
            } h-full flex items-center`}
          >
            Order History
          </button>
        </div>

        <div className='flex flex-col gap-[20px]'>
          {activeTab === 'settings' && <ProfileSetting />}
          {activeTab === 'orders' && <ProfileOrder />}
        </div>
      </article>
    </main>
  )
}

export default ProfileMain
