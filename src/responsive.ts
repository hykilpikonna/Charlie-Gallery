
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
    getNumberOnScreen(currentWidth: number = document.documentElement.clientWidth)
    {
        let margin = vhToPx(this.margin) * 2;
        let min = vhToPx(this.minWidth);

        // Screen too small
        if (currentWidth > (margin + min) * 6) return 6;

        // Loop through all the possible numbers on screen
        for (let i of [1, 2, 3, 4, 5, 6].reverse())
        {
            // Calculate margin width
            let margins = margin * i;

            // Calculate block width
            let blockWidth = (currentWidth - margins) / i;

            // Return block width
            if (blockWidth > min) return i;
        }

        // Screen too small
        return 1;
    }

    /**
     * Get the width of each block on screen so that each block's
     * width > minWidth and there are maximum number of blocks displayed.
     *
     * @param currentWidth
     */
    getBlockWidth(currentWidth: number = document.documentElement.clientWidth)
    {
        let count = this.getNumberOnScreen(currentWidth);
        return (currentWidth - vhToPx(this.margin) * count * 2) / count - 5;
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
