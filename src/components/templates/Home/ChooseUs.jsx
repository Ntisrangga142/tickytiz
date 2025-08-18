
import iconShield from "/assets/imgs/home/icon/icon-shield.png";
import iconCircle from "/assets/imgs/home/icon/icon-circle.png";
import iconliveChat from "/assets/imgs/home/icon/icon-liveChat.png";

function ChooseUs() {

  return (
    <section className="pt-[14px] lg:pt-[54px] px-8 lg:px-[130px] pb-[36px]">
      <div className="w-full md:flex flex-col md:items-center lg:items-start">
        <h2 className="font-bold text-[18px] tracking-[0.75px] text-[#1D4ED8] md:text-center lg:text-left">WHY CHOOSE US</h2>
        <h1 className="mt-[14px] max-w-[638px] text-[32px] font-medium tracking-[1px] text-[#121212] md:text-center lg:text-left">
          Unleashing the Ultimate Movie Experience
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-[34px] mt-[24px]">
        {/* Card 1 */}
        <div className='flex flex-col gap-[20px] w-full lg:w-1/3 md:items-center'>
          <div className="w-[54px] h-[54px] rounded-full bg-[rgba(29,78,216,0.2)] flex justify-center items-center">
            <img src={iconShield} alt="shield-icon" />
          </div>
          <h3 className="text-[18px] font-bold">Guaranteed</h3>
          <p className="font-normal text-base tracking-[0.75px] leading-[32px] text-[#A0A3BD] md:text-center">Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.</p>
        </div>

        {/* Card 2 */}
        <div className='flex flex-col gap-[20px] w-full lg:w-1/3 md:items-center'>
          <div className="w-[54px] h-[54px] rounded-full bg-[rgba(29,78,216,0.2)] flex justify-center items-center">
            <img src={iconCircle} alt="circle-icon" />
          </div>
          <h3 className="text-[18px] font-bold">Affordable</h3>
          <p className="font-normal text-base tracking-[0.75px] leading-[32px] text-[#A0A3BD] md:text-center">Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.</p>
        </div>

        {/* Card 3 */}
        <div className='flex flex-col gap-[20px] w-full lg:w-1/3 md:items-center'>
          <div className="w-[54px] h-[54px] rounded-full bg-[rgba(29,78,216,0.2)] flex justify-center items-center">
            <img src={iconliveChat} alt="liveChat-icon" />
          </div>
          <h3 className="text-[18px] font-bold">24/7 Customer Support</h3>
          <p className="font-normal text-base tracking-[0.75px] leading-[32px] text-[#A0A3BD] md:text-center">Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.</p>
        </div>
      </div>
    </section>
  );
}


export default ChooseUs;
