export interface IComponentConfig {
    key: string;
    name: string;
    label?: string;
    placeholder?: string;
    params?: Param[];
    children?: IComponentConfig[];
}

export interface Param {
    key: string;
    value: any;
}

export class ComponentConfig implements IComponentConfig {
    key: string;
    name: string;
    label?: string;
    placeholder?: string;
    params?: Param[];
    children?: IComponentConfig[];

    constructor(
        key: string,
        name: string,
        label?: string,
        placeholder?: string,
        params?: Param[],
        children?: IComponentConfig[]) {
        this.key = key;
        this.name = name;
        this.label = label;
        this.placeholder = placeholder;
        this.params = params;
        this.children = children;
    }

    addParams(_newParam: Param) {
        this.params.push(_newParam);
    }
    addComponent(_newComponent: IComponentConfig) {
        this.children.push(_newComponent);
    }
}

