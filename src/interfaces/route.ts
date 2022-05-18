export default interface IRoute {
    path: string;
    exact: boolean;
    element: any;
    name: string;
    protected: boolean;
}