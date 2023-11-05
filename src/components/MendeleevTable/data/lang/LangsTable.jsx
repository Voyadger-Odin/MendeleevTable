import ru from './ru.json';
import en from './en.json';

const LangsTable = (locale) => {
    if (locale === 'ru'){
        return ru
    }
    return en;
};

export default LangsTable;