class ComputerComponent {
    constructor(name, description, price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }
    getInfo() {
        return `${this.name} - ${this.description} (Цена: ${this.price})`;
    }
}
class Processor extends ComputerComponent {
    constructor(name, description, price, cores, clockSpeed) {
        super(name, description, price);
        this.cores = cores;
        this.clockSpeed = clockSpeed;
    }
    getInfo() {
        return `${super.getInfo()} (Ядер: ${this.cores}, Тактовая частота: ${this.clockSpeed})`;
    }
}
class RAM extends ComputerComponent {
    constructor(name, description, price, capacity, speed) {
        super(name, description, price);
        this.capacity = capacity;
        this.speed = speed;
    }
    getInfo() {
        return `${super.getInfo()} (Объем: ${this.capacity}, Скорость: ${this.speed})`;
    }
}
class HardDrive extends ComputerComponent {
    constructor(name, description, price, capacity, type) {
        super(name, description, price);
        this.capacity = capacity;
        this.type = type;
    }
    getInfo() {
        return `${super.getInfo()} (Объем: ${this.capacity}, Тип: ${this.type})`;
    }
}
const components = [
    new Processor('Intel Core i7-9700K', 'Процессор Intel Core i7 9-го поколения', 25000, 8, '3.6 ГГц'),
    new RAM('Corsair Vengeance LPX 16GB', 'Оперативная память DDR4 16 ГБ', 6500, '16 ГБ', '3200 МГц'),
    new HardDrive('Samsung 970 EVO Plus 1TB', 'Твердотельный накопитель NVMe', 15000, '1 ТБ', 'SSD')
];
function addComponent(component) {
    components.push(component);
    renderComponents();
}
function removeComponent(index) {
    components.splice(index, 1);
    renderComponents();
}
function editComponent(index, updatedComponent) {
    components[index] = updatedComponent;
    renderComponents();
}
function renderComponents() {
    const componentList = document.getElementById('component-list');
    componentList.innerHTML = '';
    components.forEach((component, index) => {
        const componentItem = document.createElement('li');
        componentItem.textContent = `${index + 1}. ${component.getInfo()}`;
        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        editButton.addEventListener('click', () => editComponentHandler(index));
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.addEventListener('click', () => removeComponent(index));
        componentItem.appendChild(editButton);
        componentItem.appendChild(removeButton);
        componentList.appendChild(componentItem);
    });
}
function editComponentHandler(index) {
    const component = components[index];
    const updatedName = prompt('Введите новое название:', component.name);
    const updatedDescription = prompt('Введите новое описание:', component.description);
    const updatedPrice = parseFloat(prompt('Введите новую цену:', component.price));
    if (component instanceof Processor) {
        const updatedCores = parseInt(prompt('Введите количество ядер:', component.cores));
        const updatedClockSpeed = prompt('Введите тактовую частоту:', component.clockSpeed);
        const updatedComponent = new Processor(updatedName, updatedDescription, updatedPrice, updatedCores, updatedClockSpeed);
        editComponent(index, updatedComponent);
    } else if (component instanceof RAM) {
        const updatedCapacity = prompt('Введите объем памяти:', component.capacity);
        const updatedSpeed = prompt('Введите скорость памяти:', component.speed);
        const updatedComponent = new RAM(updatedName, updatedDescription, updatedPrice, updatedCapacity, updatedSpeed);
        editComponent(index, updatedComponent);
    } else if (component instanceof HardDrive) {
        const updatedCapacity = prompt('Введите объем накопителя:', component.capacity);
        const updatedType = prompt('Введите тип накопителя:', component.type);
        const updatedComponent = new HardDrive(updatedName, updatedDescription, updatedPrice, updatedCapacity, updatedType);
        editComponent(index, updatedComponent);
    }
}
function addComponentHandler() {
    const componentType = prompt('Выберите тип компонента (1 - Процессор, 2 - Оперативная память, 3 - Накопитель)');

    const name = prompt('Введите название компонента:');
    const description = prompt('Введите описание компонента:');
    const price = parseFloat(prompt('Введите цену компонента:'));

    if (componentType === '1') {
        const cores = parseInt(prompt('Введите количество ядер:'));
        const clockSpeed = prompt('Введите тактовую частоту:');
        const newComponent = new Processor(name, description, price, cores, clockSpeed);
        addComponent(newComponent);
    } else if (componentType === '2') {
        const capacity = prompt('Введите объем памяти:');
        const speed = prompt('Введите скорость памяти:');
        const newComponent = new RAM(name, description, price, capacity, speed);
        addComponent(newComponent);
    } else if (componentType === '3') {
        const capacity = prompt('Введите объем накопителя:');
        const type = prompt('Введите тип накопителя:');
        const newComponent = new HardDrive(name, description, price, capacity, type);
        addComponent(newComponent);
    }
}
renderComponents();