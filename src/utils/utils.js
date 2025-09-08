// utils/timerUtils.js

export function formatTime(totalSeconds) {
    const days = Math.floor(totalSeconds / (24 * 3600));
    totalSeconds %= 24 * 3600;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    return { days, hours, minutes, seconds };
  }
  
  export function LiveTimer(initialSeconds, onUpdate) {

    let remainingSeconds = initialSeconds;
  
    const timer = setInterval(() => {
      if (remainingSeconds <= 0) {
        clearInterval(timer);
        return;
      }
  
      const time = formatTime(remainingSeconds);
      onUpdate(time);
      remainingSeconds--;
    }, 1000);
  
    return () => clearInterval(timer); 
  }

export async function saveToSheet(data) {
    const response = await fetch(import.meta.env.VITE_GOOGLE_SHEET_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        // headers: {
        //     'Content-Type': 'application/json',
        // },
    });
    return response.text();
}
  