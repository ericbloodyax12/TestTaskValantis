import  {Md5} from 'ts-md5';

export const getXAuth = () => {
  const password = 'Valantis'
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
// метод replace заменяет все вхождения символа дефиса ("-") в строке на пустую строку, тем самым удаляя все дефисы из строки
// регулярка /-/g означает, что нужно заменить все вхождения дефиса, а флаг g (от "global") указывает на глобальный
// поиск по всей строке
  const md5 = new Md5();
  md5.appendStr(password + '_' + timestamp)
   const hash = md5.end();
   return  `${hash}`
}

// const now = new Date();
// const year = now.getUTCFullYear();
// const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // метод возвращает месяц указанного объекта Date в формате UTC.
// // Значения месяцев в JavaScript начинаются с 0 для января и заканчиваются 11 для декабря
// // Чтобы получить текущий месяц в числовом формате, к возвращаемому значению добавляется 1
// // padStart метод добавляет нули в начало строки, если ее длина меньше указанной
// const day = String(now.getUTCDate()).padStart(2, '0');
// export const timestamp = `${year}${month}${day}`;