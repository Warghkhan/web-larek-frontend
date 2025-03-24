/**
 * Тесты для проверки работы форм
 */

import { ApplicationState } from '../components/model/ApplicationState';
import { EventEmitter } from '../components/base/events';

// Создаем фиктивный объект событий для тестов
const mockEvents = {
    on: jest.fn(),
    emit: jest.fn(),
    trigger: jest.fn()
};

describe('Валидация форм', () => {
    let appState: ApplicationState;
    
    beforeEach(() => {
        // Инициализация состояния приложения перед каждым тестом
        appState = new ApplicationState(mockEvents as unknown as EventEmitter);
    });
    
    afterEach(() => {
        // Очистка моков после каждого теста
        jest.clearAllMocks();
    });
    
    // Тесты для валидации email
    describe('Валидация email', () => {
        test('Правильный email проходит валидацию', () => {
            const result = appState.validateEmail('test@example.com');
            expect(result).toBeNull();
        });
        
        test('Пустой email не проходит валидацию', () => {
            const result = appState.validateEmail('');
            expect(result).not.toBeNull();
        });
        
        test('Некорректный email не проходит валидацию', () => {
            const result = appState.validateEmail('test@');
            expect(result).not.toBeNull();
        });
    });
    
    // Тесты для валидации телефона
    describe('Валидация телефона', () => {
        test('Правильный телефон проходит валидацию', () => {
            const result = appState.validatePhone('+7 (123) 456-78-90');
            expect(result).toBeNull();
        });
        
        test('Пустой телефон не проходит валидацию', () => {
            const result = appState.validatePhone('');
            expect(result).not.toBeNull();
        });
        
        test('Некорректный телефон не проходит валидацию', () => {
            const result = appState.validatePhone('abc');
            expect(result).not.toBeNull();
        });
    });
    
    // Тесты для валидации адреса
    describe('Валидация адреса', () => {
        test('Правильный адрес проходит валидацию', () => {
            const result = appState.validateAddress('ул. Пушкина, д. 10, кв. 5');
            expect(result).toBeNull();
        });
        
        test('Пустой адрес не проходит валидацию', () => {
            const result = appState.validateAddress('');
            expect(result).not.toBeNull();
        });
        
        test('Короткий адрес не проходит валидацию', () => {
            const result = appState.validateAddress('ул. К');
            expect(result).not.toBeNull();
        });
    });
    
    // Комплексные тесты для валидации формы заказа
    describe('Валидация формы заказа', () => {
        test('Полностью заполненная форма валидна', () => {
            // Заполняем информацию о заказе
            appState.updateOrderField('email', 'test@example.com');
            appState.updateOrderField('phone', '+7 (123) 456-78-90');
            appState.updateOrderField('address', 'ул. Пушкина, д. 10, кв. 5');
            appState.updateOrderField('payment', 'card');
            
            // Проверяем валидность
            const result = appState.validateContactInfo();
            expect(result).toBe(true);
        });
        
        test('Неполная форма невалидна', () => {
            // Заполняем информацию о заказе частично
            appState.updateOrderField('email', 'test@example.com');
            appState.updateOrderField('phone', '');
            appState.updateOrderField('address', 'ул. Пушкина, д. 10, кв. 5');
            
            // Проверяем валидность
            const result = appState.validateContactInfo();
            expect(result).toBe(false);
        });
    });
}); 