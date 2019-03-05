export interface Param {
    key: string;
    value: any;
}

export interface Config {
    index?: number;
    key?: string;
    component?: string;
    label?: string;
    placeholder?: string;
    params?: Param[];
    // children?: IComponentConfig[];
}

// export class ComponentConfig {
//     constructor(public component: Type<WidgetComponent>, public config: Config) { }
// }

// export class ComponentConfig implements IComponentConfig {
//     key: string;
//     name: string;
//     component: Type<WidgetComponent>;
//     label?: string;
//     placeholder?: string;
//     params?: Param[];
//     children?: IComponentConfig[];

//     constructor(
//         key: string,
//         name: string,
//         component?: Type<any>,
//         label?: string,
//         placeholder?: string,
//         params?: Param[],
//         children?: IComponentConfig[]) {
//         this.key = key;
//         this.name = name;
//         this.component = component;
//         this.label = label;
//         this.placeholder = placeholder;
//         this.params = params;
//         this.children = children;
//     }

//     addParams(_newParam: Param) {
//         this.params.push(_newParam);
//     }
//     addComponent(_newComponent: IComponentConfig) {
//         this.children.push(_newComponent);
//     }
// }

