import * as React from 'react';

type Props = {
    pageSize: number
    changePageSize: (size: number) => void
}

export const PageSizeSelector = ({ changePageSize, pageSize }: Props) => {
    return (
        <label>
            Show
            <select value={pageSize} onChange={(e) => changePageSize(Number(e.target.value))}>
                {[4, 8, 16].map(size => (
                    <option value={size} key={size}>{size}</option>
                ))}
            </select>
        </label>
    );
};