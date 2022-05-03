const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

function dateFormatter(date) {
  var d = new Date(date);
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} ${
    d.getHours() < 10 ? '0'+d.getHours() : d.getHours() }:${d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes() }`;
}

module.exports = dateFormatter;