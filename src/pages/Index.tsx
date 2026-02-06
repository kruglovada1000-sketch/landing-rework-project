import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [guestCount, setGuestCount] = useState([100]);
  const [hours, setHours] = useState([4]);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('https://functions.poehali.dev/8ac0f670-c591-46ae-93da-0724e1063871', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Спасибо! Мы свяжемся с вами в ближайшее время.');
        setFormData({ name: '', phone: '' });
      } else {
        setSubmitMessage(data.error || 'Произошла ошибка. Попробуйте позже.');
      }
    } catch (error) {
      setSubmitMessage('Ошибка отправки. Проверьте подключение к интернету.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculatePrice = () => {
    const basePrice = 50000;
    const guestMultiplier = guestCount[0] / 100;
    const hourMultiplier = hours[0] / 4;
    return Math.round(basePrice * guestMultiplier * hourMultiplier);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark via-dark to-darker text-white">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <img 
                src="https://cdn.poehali.dev/files/877bbef8-2114-474f-8e32-ebd709ccef63.png" 
                alt="Logo" 
                className="h-8 md:h-12 w-auto flex-shrink-0"
              />
              <span className="text-xs sm:text-sm md:text-2xl font-bold text-gold leading-tight truncate">Рускорпорация охрана и консалтинг</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['Главная', 'Преимущества', 'Услуги', 'Отзывы', 'Калькулятор', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm uppercase tracking-wider transition-colors hover:text-gold ${
                    activeSection === item.toLowerCase() ? 'text-gold' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="главная" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in leading-tight">
            Эксклюзивная охрана
            <span className="block text-gold mt-2">премиум-мероприятий</span>
            <span className="block text-white mt-2 text-3xl sm:text-4xl md:text-5xl">личная охрана</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 animate-fade-in">
            Профессиональная защита вашего мероприятия с гарантией безопасности и конфиденциальности
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold/90 text-dark font-semibold px-8 py-6 text-lg"
              onClick={() => scrollToSection('контакты')}
            >
              Заказать консультацию
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gold text-gold hover:bg-gold/10 px-8 py-6 text-lg"
              onClick={() => scrollToSection('калькулятор')}
            >
              Рассчитать стоимость
            </Button>
          </div>
        </div>
      </section>

      <section id="преимущества" className="py-20 px-4 bg-darker/50">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-16">
            Наши <span className="text-gold">преимущества</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Shield', title: 'Опыт 15+ лет', desc: 'Охрана мероприятий любого масштаба и уровня' },
              { icon: 'Award', title: 'Лицензии и сертификаты', desc: 'Полный пакет разрешительных документов' },
              { icon: 'Users', title: 'Профессиональная команда', desc: 'Сотрудники с опытом в спецподразделениях' },
              { icon: 'Clock', title: '24/7 мониторинг', desc: 'Круглосуточная поддержка и оперативное реагирование' },
              { icon: 'Lock', title: 'Конфиденциальность', desc: 'Абсолютная гарантия сохранения информации' },
              { icon: 'TrendingUp', title: 'Индивидуальный подход', desc: 'Разработка уникальной концепции безопасности' }
            ].map((item, index) => (
              <Card key={index} className="bg-dark/50 border-gold/20 hover:border-gold/50 transition-all duration-300 hover-scale">
                <CardHeader>
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name={item.icon} className="text-gold" size={32} />
                  </div>
                  <CardTitle className="text-gold text-xl md:text-2xl font-display">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="услуги" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-16">
            Наши <span className="text-gold">услуги</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { title: 'Охрана свадеб и торжеств', price: 'от 50 000 ₽', features: ['Контроль доступа гостей', 'Охрана подарков', 'Сопровождение VIP-персон'] },
              { title: 'Корпоративные мероприятия', price: 'от 80 000 ₽', features: ['Периметральная охрана', 'Контроль парковки', 'Работа с оборудованием'] },
              { title: 'Концерты и шоу', price: 'от 120 000 ₽', features: ['Crowd control', 'Защита артистов', 'Эвакуационные планы'] },
              { title: 'Выставки и презентации', price: 'от 60 000 ₽', features: ['Охрана экспонатов', 'Пропускной режим', 'Ночная охрана'] }
            ].map((service, index) => (
              <Card key={index} className="bg-gradient-to-br from-dark to-darker border-gold/30 hover-scale">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-display text-gold">{service.title}</CardTitle>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-2">{service.price}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <Icon name="CheckCircle" className="text-gold" size={20} />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="отзывы" className="py-20 px-4 bg-darker/50">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-16">
            Отзывы <span className="text-gold">клиентов</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Александр М.', role: 'Организатор свадеб', text: 'Профессионалы высочайшего уровня! Гости даже не заметили присутствия охраны, но безопасность была на 100%.' },
              { name: 'Елена К.', role: 'Директор галереи', text: 'Доверяем охрану наших выставок только этой компании. Ответственность и внимание к деталям на высоте.' },
              { name: 'Михаил П.', role: 'Event-менеджер', text: 'Сотрудничаем уже 5 лет. Ни одного инцидента за все время! Рекомендую для премиум-мероприятий.' }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-dark/50 border-gold/20">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-gold fill-gold" size={20} />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-gold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="калькулятор" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-16">
            Калькулятор <span className="text-gold">стоимости</span>
          </h2>
          <Card className="bg-gradient-to-br from-dark to-darker border-gold/30">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <label className="block text-lg mb-4 text-white">Количество гостей: <span className="text-gold font-bold">{guestCount[0]}</span></label>
                  <Slider
                    value={guestCount}
                    onValueChange={setGuestCount}
                    min={50}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm font-semibold mt-2 text-white">
                    <span>50</span>
                    <span>500</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-lg mb-4 text-white">Длительность (часов): <span className="text-gold font-bold">{hours[0]}</span></label>
                  <Slider
                    value={hours}
                    onValueChange={setHours}
                    min={2}
                    max={12}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm font-semibold mt-2 text-white">
                    <span>2</span>
                    <span>12</span>
                  </div>
                </div>

                <div className="bg-gold/10 rounded-lg p-6 text-center border border-gold/30">
                  <p className="text-gray-300 mb-2">Ориентировочная стоимость:</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold">{calculatePrice().toLocaleString('ru-RU')} ₽</p>
                  <p className="text-sm text-gray-400 mt-2">Финальная цена определяется после консультации</p>
                </div>

                <Button 
                  className="w-full bg-gold hover:bg-gold/90 text-dark font-semibold py-6 text-base sm:text-lg px-4"
                  onClick={() => scrollToSection('контакты')}
                >
                  Получить точный расчет
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="контакты" className="py-20 px-4 bg-darker/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-16">
            Свяжитесь <span className="text-gold">с нами</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-display text-gold mb-6">Контактная информация</h3>
              <div className="flex items-start space-x-4">
                <Icon name="Phone" className="text-gold mt-1" size={24} />
                <div>
                  <p className="font-semibold">Телефон</p>
                  <a href="tel:+79250474225" className="text-gray-300 hover:text-gold transition-colors">+7 (925) 047-42-25</a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Icon name="Mail" className="text-gold mt-1" size={24} />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:fizohrana@ruscor24.ru" className="text-gray-300 hover:text-gold transition-colors">fizohrana@ruscor24.ru</a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Icon name="MapPin" className="text-gold mt-1" size={24} />
                <div>
                  <p className="font-semibold">Адрес</p>
                  <p className="text-gray-300">г. Москва, ул. Новая дорога д. 9, к2</p>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="bg-dark/50 border-gold/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-display text-gold mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 fill-[#0088cc]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.03-.74 4.04-1.76 6.74-2.92 8.09-3.49 3.85-1.61 4.65-1.89 5.18-1.9.11 0 .37.03.54.17.14.11.18.26.2.37.01.06.03.24.01.38z"/>
                    </svg>
                    НАШ ТЕЛЕГРАМ
                  </h3>
                  <form className="space-y-4" onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    setSubmitMessage('');
                    
                    try {
                      const response = await fetch('https://functions.poehali.dev/c7ce844b-e653-4fe0-a41a-8d5a65721fe1', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                      });
                      
                      if (response.ok) {
                        setSubmitMessage('Спасибо! Ваша заявка отправлена.');
                        setFormData({ name: '', phone: '' });
                      } else {
                        setSubmitMessage('Ошибка отправки. Попробуйте позже.');
                      }
                    } catch (error) {
                      setSubmitMessage('Ошибка отправки. Попробуйте позже.');
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}>
                    <Input 
                      placeholder="Ваше имя" 
                      className="bg-darker border-gold/20 focus:border-gold text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <Input 
                      type="tel" 
                      placeholder="Телефон" 
                      className="bg-darker border-gold/20 focus:border-gold text-white"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                    {submitMessage && (
                      <p className={`text-sm ${submitMessage.includes('Спасибо') ? 'text-gold' : 'text-red-400'}`}>
                        {submitMessage}
                      </p>
                    )}
                    <Button 
                      type="submit"
                      className="w-full bg-gold hover:bg-gold/90 text-dark font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-darker py-8 px-4 border-t border-gold/20">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">© 2024 Premium Security. Все права защищены.</p>
        </div>
      </footer>


    </div>
  );
};

export default Index;