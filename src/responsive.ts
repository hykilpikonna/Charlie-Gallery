
export default class Responsive
{
    minWidth: number;
    margin: number;

    constructor(minWidth: number, margin: number)
    {
        this.minWidth = minWidth;
        this.margin = margin;
    }

    getBlockWidth(currentWidth: number)
    {
        // Screen too small
        if (currentWidth < vhToPx(this.margin) * 2 + this.minWidth) return this.minWidth;

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

        // Screen too big
        return this.maxWidth;
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
