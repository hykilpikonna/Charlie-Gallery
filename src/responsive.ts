
export default class Responsive
{
    maxWidth: number;
    minWidth: number;
    margin: number;

    constructor(maxWidth: number, minWidth: number, margin: number)
    {
        this.maxWidth = maxWidth;
        this.minWidth = minWidth;
        this.margin = margin;
    }
}

/**
 * vh to px
 *
 * @param vh
 */
function vhToPx(vh: number): number
{
    return document.documentElement.clientHeight * vh / 100;
}
