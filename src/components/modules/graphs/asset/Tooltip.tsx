import {FC} from "react";

type Props = {
    tooltip: { display: boolean, top: number, left: number, price: number, date: string } | null,
    lineColor: string
}

export const Tooltip:FC<Props> = ({tooltip, lineColor}) => {
    if (tooltip)
        return (
            <div className="chart-container" style={{
                display: tooltip.display ? 'block' : 'none',
                top: tooltip.top,
                left: tooltip.left,
            }}>
                <div style={{color: lineColor}}>Detail</div>
                <div style={{fontSize: '24px', margin: '4px 0px'}}>
                    {tooltip.price}
                </div>
                <div>
                    {tooltip.date}
                </div>
            </div>
    );
}
