
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

    getBlockWidth(currentWidth: number)
    {
        // Loop through all the possible numbers on screen
        [1, 2, 3, 4, 5, 6].forEach(i =>
        {
            // Calculate margin width
            let margins = vhToPx(this.margin) * (i + 1);

            // Calculate block width
            let blockWidth = (currentWidth - margins) / i;

            // Return block width
            if (blockWidth > this.minWidth && blockWidth < this.maxWidth) return blockWidth;
        });
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
