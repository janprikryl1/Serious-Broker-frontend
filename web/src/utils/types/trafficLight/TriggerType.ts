export type TriggerType = {
    id: string,
    event: string,
    eventByPercentage: number,
    action: string,
    actionByPercentage?: number,
    color: string;
}