export default function Card({ label, data }) {
  return (
    <div
      className="bg-gradient-to-b from-[#344E41] to-[#588157] 
      p-6 sm:p-6 rounded-xl shadow-lg text-center text-white 
      w-[80%] h-[120px] sm:h-[180px]
      transform transition-transform duration-300 hover:scale-105"
    >
      <h2 className="text-[24px] sm:text-[26px] font-bold">{label}</h2>
      <p className="text-3xl sm:text-[60px] md:text-[60px] font-semibold">{data}</p>
    </div>
  );
}
