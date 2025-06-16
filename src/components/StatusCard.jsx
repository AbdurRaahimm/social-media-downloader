

// eslint-disable-next-line react/prop-types
function StatusCard({color, icon, title,message}) {
  return (
    <div className={`bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex flex-col items-center text-center`}>
    <div className={`mb-4 w-14 h-14 rounded-full flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
    <p className="text-sm text-slate-400 mt-1">{message}</p>
  </div>
  )
}

export default StatusCard