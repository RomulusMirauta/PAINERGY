export interface SliderProps {
    value: number;
    onChange: (event: Event, value: number | number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    label: string;
}