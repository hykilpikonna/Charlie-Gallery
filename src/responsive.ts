
export default class Responsive
{
    minWidth: number;
    margin: number;

    constructor(minWidth: number, margin: number)
    {
        this.minWidth = minWidth;
        this.margin = margin;
    }

    /**
     * Get the maximum number of blocks on screen so that each block's
     * width > minWidth.
     *
     * @param currentWidth
     */
    getNumberOnScreen(currentWidth: number)
    {
        // Screen too small
        if (currentWidth < vhToPx(this.margin) * 2 + this.minWidth) return 1;

        // Loop through all the possible numbers on screen
        [1, 2, 3, 4, 5, 6].reverse().forEach(i =>
        {
            // Calculate margin width
            let margins = vhToPx(this.margin) * (i + 1);

            // Calculate block width
            let blockWidth = (currentWidth - margins) / i;

            // Return block width
            if (blockWidth > this.minWidth) return i;
        });

        // Screen too big
        return 6;
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
