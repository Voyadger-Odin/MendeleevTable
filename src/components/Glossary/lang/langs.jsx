import ru from './ru.json';
import en from './en.json';

const Langs = (locale) => {
    if (locale === 'ru'){
        return ru
    }
    return en;
};

export default Langs;