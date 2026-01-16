import Link from "@/shared/ui/Link";
import Image from "next/image";

type Props = {};

export default function Index({}: Props) {
  const stats = [
    {
      value: "10,000+",
      label: "Активных пользователей",
      color: "text-blue-400",
    },
    { value: "100+", label: "Упражнений в базе", color: "text-purple-400" },
    {
      value: "50,000+",
      label: "Тренировок выполнено",
      color: "text-green-400",
    },
    { value: "4.9", label: "Средняя оценка", color: "text-orange-400" },
  ];

  const testimonials = [
    {
      name: "Анна Михайлова",
      city: "Москва",
      initials: "AM",
      text: "«ФитнесПро помог мне сбросить 15 кг за 3 месяца! Отслеживание калорий и прогресса делает всё намного проще.»",
      stars: 5,
    },
    {
      name: "Дмитрий Козлов",
      city: "Санкт-Петербург",
      initials: "ДК",
      text: "«Лучшее приложение для тренировок! База упражнений огромная, а интерфейс очень удобный. Рекомендую всем!»",
      stars: 4,
    },
    {
      name: "Елена Смирнова",
      city: "Казань",
      initials: "ЕС",
      text: "«Наконец-то нашла платформу, где всё в одном месте. Трекер прогресса мотивирует продолжать каждый день!»",
      stars: 5,
    },
  ];

  const faqs = [
    {
      question: "Действительно ли это бесплатно?",
      answer:
        "Да! Все основные функции платформы абсолютно бесплатны. Вы можете создавать тренировки, отслеживать прогресс и использовать счётчик калорий без каких-либо ограничений.",
    },
    {
      question: "Нужно ли быть опытным спортсменом?",
      answer:
        "Нет! Наша платформа подходит для людей с любым уровнем подготовки — от новичков до профессиональных атлетов. Упражнения адаптируются под ваш уровень.",
    },
    {
      question: "Можно ли тренироваться дома?",
      answer:
        "Конечно! У нас есть множество упражнений, которые не требуют специального оборудования и идеально подходят для домашних тренировок.",
    },
    {
      question: "Как быстро я увижу результаты?",
      answer:
        "Первые результаты обычно заметны через 2–3 недели регулярных тренировок. Однако скорость прогресса индивидуальна и зависит от многих факторов.",
    },
  ];
  return (
    <>
      <section style={{backgroundImage : "url('/img/mainPageStart.png')"}} className="bg-[#0b1320] bg-no-repeat bg-cover bg-center text-white py-16 relative">
        <div className="absolute inset-0 bg-[#000000af] z-0" />
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 px-2.5">
          {/* LEFT */}
          <div className="space-y-6 mx-auto px-2.5">
            <span className="inline-flex items-center gap-2 bg-[#112551] text-[#73a2d8] font-bold px-4 py-2 rounded-full text-sm">
              <span className="text-blue-400">
                <Image
                  alt="lightning"
                  width={20}
                  height={20}
                  src={"svg/lightning.svg"}
                />
              </span>
              Уже более 10,000 активных пользователей
            </span>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight max-w-[450px]">
              Трансформируйте своё тело и жизнь
            </h1>

            <p className="text-gray-300 max-w-lg">
              Персональная платформа для достижения ваших фитнес-целей.
              Отслеживайте прогресс, подбирайте упражнения и контролируйте
              калории в одном месте. Начните путь к лучшей версии себя уже
              сегодня.
            </p>

            <div className="flex gap-4">
              <Link href="/excercise">Начать бесплатно</Link>
            </div>

            <div className="flex gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2 text-[18px]">
                <Image src={"svg/ok.svg"} alt="ok" width={30} height={30} /> Без
                кредитной карты
              </div>
              <div className="flex items-center gap-2 text-[18px]">
                <Image src={"svg/ok.svg"} alt="ok" width={30} height={30} />{" "}
                Бесплатный доступ
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-[#101a2c]/50 backdrop-blur-xl rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Ваш прогресс ждёт</h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center bg-[#132033] p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center p-2.5 bg-fuchsia-700 rounded-full">
                    <Image
                      src={"/svg/syrvey.svg"}
                      alt="syrvey"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div>
                    <div className="font-medium">Установите цели</div>
                    <div className="text-sm text-gray-400">
                      Это займёт не более 2 минут
                    </div>
                  </div>
                </div>
                <Image src={"svg/ok.svg"} alt="ok" width={30} height={30} />{" "}
              </div>

              <div className="flex justify-between items-center bg-[#132033] p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center p-2.5 bg-blue-700 rounded-full">
                    <Image
                      src={"/svg/users.svg"}
                      alt="users"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div>
                    <div className="font-medium">Подберите упражнения</div>
                    <div className="text-sm text-gray-400">100+ вариантов</div>
                  </div>
                </div>
                <Image src={"svg/ok.svg"} alt="ok" width={30} height={30} />{" "}
              </div>

              <div className="flex justify-between items-center bg-[#132033] p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center p-2.5 bg-amber-700 rounded-full">
                    <Image
                      src={"/svg/progress.svg"}
                      alt="progres"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div>
                    <div className="font-medium">Отслеживайте результаты</div>
                    <div className="text-sm text-gray-400">
                      В реальном времени
                    </div>
                  </div>
                </div>
                <Image src={"svg/ok.svg"} alt="ok" width={30} height={30} />{" "}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#131c2b] py-16">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-10">
          {stats.map((item) => (
            <div key={item.value} className="space-y-2">
              <div className={`text-3xl font-semibold ${item.color}`}>
                {item.value}
              </div>
              <div className="text-gray-300 text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0e1625] text-white py-20">
        <div className="container mx-auto text-center space-y-3 max-w-3xl mb-12">
          <h2 className="text-3xl font-bold">
            Всё необходимое для вашего успеха
          </h2>
          <p className="text-gray-400">
            Комплексный набор инструментов для достижения ваших фитнес-целей
          </p>
        </div>

        {/* Кароточки */}

        <div className="container mx-auto grid md:grid-cols-4 gap-6 max-w-6xl px-2.5">
          <div className="bg-[#132033] rounded-2xl p-6 border border-transparent hover:border-gray-600 transition group-[]:">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg bg-blue-700 mb-4 group-hover:scale-125`}
            >
              <Image
                src={"svg/syrvey.svg"}
                width={20}
                height={20}
                alt="syrvey"
              />
            </div>

            <h3 className="font-semibold mb-2">Персональные цели</h3>
            <p className="text-gray-400 text-sm">
              Определите свои цели и получите персональные рекомендации по
              тренировкам
            </p>
          </div>

          <div className="bg-[#132033] rounded-2xl p-6 border border-transparent hover:border-gray-600 transition group-[]:">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg bg-fuchsia-700 mb-4 group-hover:scale-125`}
            >
              <Image src={"svg/users.svg"} width={20} height={20} alt="users" />
            </div>

            <h3 className="font-semibold mb-2">База упражнений</h3>
            <p className="text-gray-400 text-sm">
              Более 100 упражнений с подробными описаниями и видео-инструкциями
            </p>
          </div>

          <div className="bg-[#132033] rounded-2xl p-6 border border-transparent hover:border-gray-600 transition group-[]:">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-700 mb-4 group-hover:scale-125`}
            >
              <Image src={"svg/prize.svg"} width={20} height={20} alt="prize" />
            </div>

            <h3 className="font-semibold mb-2">Счётчик калорий</h3>
            <p className="text-gray-400 text-sm">
              Отслеживайте потребление и расход калорий для достижения целей
            </p>
          </div>

          <div className="bg-[#132033] rounded-2xl p-6 border border-transparent hover:border-gray-600 transition group-[]:">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg bg-amber-700 mb-4 group-hover:scale-125`}
            >
              <Image
                src={"svg/progress.svg"}
                width={20}
                height={20}
                alt="progress"
              />
            </div>

            <h3 className="font-semibold mb-2">Трекер прогресса</h3>
            <p className="text-gray-400 text-sm">
              Визуализируйте свой прогресс и отмечайте достижения
            </p>
          </div>
        </div>
      </section>

      <section className="px-2.5 relative">
        <div className="xl:bg-[#132033] rounded-xl mx-auto max-w-[1600px] w-full flex xl:flex-row flex-col justify-between">
          <div className="xl:w-[65%] xl:p-10 p-3 max-w-[980px] mx-auto">
            <h3 className="text-white text-[30px] font-semibold xl:mb-[30px] mb-[15px]">
              Как это работает?
            </h3>
            <div className="flex xl:flex-col xl:justify-start justify-center px-[15px] flex-wrap gap-3.5 absolute xl:static left-0 lg:top-[calc(50%-80px)] top-[20%] z-20">
              {/* 1 */}
              <div className="flex items-start gap-4">
                <div className="flex items-center mt-[5px] justify-center rounded-full bg-blue-700 w-max text-white py-2.5 px-[18px]">
                  1
                </div>

                <div>
                  <h5 className="text-white text-[18px] md:text-[20px] xl:text-[22px] mb-2.5">
                    Пройдите короткий опрос
                  </h5>
                  <p className="max-w-[400px] text-gray-400 text-[14px] md:text-[16px] xl:text-[18px]">
                    Расскажите о своих целях, уровне подготовки и предпочтениях.
                    Это займет всего 2 минуты.
                  </p>
                </div>
              </div>

              {/* 2 */}
              <div className="flex items-start gap-4">
                <div className="flex items-center mt-[5px] justify-center rounded-full bg-indigo-700 w-max text-white py-2.5 px-[18px]">
                  2
                </div>

                <div>
                  <h5 className="text-white text-[18px] md:text-[20px] xl:text-[22px] mb-2.5">
                    Получите персональный план
                  </h5>
                  <p className="max-w-[400px] text-gray-400 text-[14px] md:text-[16px] xl:text-[18px]">
                    На основе ваших ответов мы подберем упражнения и
                    рекомендации специально для вас.
                  </p>
                </div>
              </div>

              {/* 3 */}
              <div className="flex items-start gap-4">
                <div className="flex items-center mt-[5px] justify-center rounded-full bg-emerald-700 w-max text-white py-2.5 px-[18px]">
                  3
                </div>

                <div>
                  <h5 className="text-white text-[18px] md:text-[20px] xl:text-[22px] mb-2.5">
                    Тренируйтесь и отслеживайте прогресс
                  </h5>
                  <p className="max-w-[400px] text-gray-400 text-[14px] md:text-[16px] xl:text-[18px]">
                    Выполняйте упражнения, записывайте результаты и наблюдайте
                    за своим прогрессом в реальном времени.
                  </p>
                </div>
              </div>

              {/* 4 */}
              <div className="flex items-start gap-4">
                <div className="flex items-center mt-[5px] justify-center rounded-full bg-amber-700 w-max text-white py-2.5 px-[18px]">
                  4
                </div>

                <div>
                  <h5 className="text-white text-[18px] md:text-[20px] xl:text-[22px] mb-2.5">
                    Достигайте своих целей
                  </h5>
                  <p className="max-w-[400px] text-gray-400 text-[14px] md:text-[16px] xl:text-[18px]">
                    Отмечайте достижения, корректируйте план и продолжайте
                    совершенствоваться каждый день.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute bg-[#00000089] inset-0 z-10 xl:hidden" />
            <img
              src={"/img/trainMan.png"}
              alt="trainMan"
              className="w-full max-h-full min-h-[500px] xl:max-w-[900px] mx-auto h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="xl:py-14 lg:py-10 py-4 bg-[#0F1623] text-white">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold">
            Что говорят наши пользователи
          </h2>
          <p className="text-gray-400 mt-2">Истории успеха реальных людей</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#1A2233] p-6 rounded-xl border border-gray-700/40"
            >
              {/* Stars */}
              <div className="flex text-yellow-400 mb-4">
                {Array.from({ length: item.stars }).map((_, i) => (
                  <Image
                    key={i}
                    src={"svg/star.svg"}
                    width={30}
                    height={30}
                    alt="star"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 mb-6 leading-relaxed">{item.text}</p>

              {/* User */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                  {item.initials}
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-400 text-sm">{item.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="xl:py-14 lg:py-10 py-4  bg-[#0F1623] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-2xl lg:p-10 p-2 bg-linear-to-r from-[#5B5CFF] via-[#7A5CFF] to-[#C65CFF]">
            <div className="flex flex-col lg:flex-row gap-10 mx-auto lg:max-w-full max-w-max">
              {/* LEFT SIDE — LIST */}
              <div className="flex-1 space-y-6">
                <h3 className="text-lg font-medium mb-4">
                  Почему выбирают ФитнесПро
                </h3>

                <div className="flex items-start gap-3">
                  <Image
                    src={"/svg/protect.svg"}
                    alt="protect"
                    width={30}
                    height={30}
                  />
                  <div>
                    <p className="font-semibold">Безопасно и надёжно</p>
                    <p className="text-white/80 text-sm">
                      Ваши данные защищены современными методами шифрования
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Image
                    src={"/svg/clock.svg"}
                    alt="clock"
                    width={30}
                    height={30}
                  />

                  <div>
                    <p className="font-semibold">Доступно 24/7</p>
                    <p className="text-white/80 text-sm">
                      Тренируйтесь когда удобно — платформа работает
                      круглосуточно
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Image
                    src={"/svg/lightningWhite.svg"}
                    alt="lightning"
                    width={30}
                    height={30}
                  />

                  <div>
                    <p className="font-semibold">Быстрые результаты</p>
                    <p className="text-white/80 text-sm">
                      Персонализированный подход обеспечивает эффективный
                      прогресс
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Image
                    src={"/svg/users.svg"}
                    alt="users"
                    width={30}
                    height={30}
                  />

                  <div>
                    <p className="font-semibold">Поддержка сообщества</p>
                    <p className="text-white/80 text-sm">
                      Присоединяйтесь к активному сообществу единомышленников
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT CARD — PRICING */}
              <div className="flex-1">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center h-full flex flex-col justify-center">
                  <p className="text-sm text-white/80 mb-6">
                    Начните прямо сейчас
                  </p>

                  <div className="bg-white/10 rounded-xl p-5 border border-white/10 text-sm mb-6">
                    <div className="flex justify-between font-semibold">
                      <span>Базовый</span>
                      <span>Бесплатно</span>
                    </div>
                    <p className="text-white/70 mt-1 text-left">
                      Доступ ко всем основным функциям
                    </p>
                  </div>

                  <Link href="/excercise" className="justify-center bg-indigo-600">
                    Попробовать бесплатно
                  </Link>

                  <p className="text-xs text-white/70 mt-4">
                    Без кредитной карты • Без скрытых платежей
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="xl:py-14 lg:py-10 py-4 bg-[#0F1623] text-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold">Часто задаваемые вопросы</h2>
            <p className="text-gray-400 mt-2">
              Ответы на популярные вопросы о платформе
            </p>
          </div>

          {/* Список FAQ */}
          <div className="space-y-6">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="bg-[#1A2233] border border-gray-700/40 p-6 rounded-xl"
              >
                <p className="font-semibold mb-2">{item.question}</p>
                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
