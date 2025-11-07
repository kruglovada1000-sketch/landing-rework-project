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
                  className="w-full bg-gold hover:bg-gold/90 text-dark font-semibold py-6 text-lg"
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
                  <form className="space-y-4" onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    setSubmitMessage('');
                    
                    try {
                      const response = await fetch('https://functions.poehali.dev/54910eb6-f355-4ecb-986d-714b62546c8e', {
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
                      className="bg-darker border-gold/20 focus:border-gold"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <Input 
                      type="tel" 
                      placeholder="Телефон" 
                      className="bg-darker border-gold/20 focus:border-gold"
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

      <a
        href="https://wa.me/79250474225?text=Здравствуйте!%20Хочу%20узнать%20о%20ваших%20услугах"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
        aria-label="Написать в WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
};

export default Index;