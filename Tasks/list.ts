{
    interface iList {
        name: string;
        value: number;
        prevItem?: iList;
        nextItem?: iList;
    }

    class List {
        lists: iList[] = [];
        current: iList;
        constructor(listElements: iList[]) {
            this.lists = listElements.map((item, index) => ({
                ...item,
                prevItem: listElements[index - 1],
                nextItem: listElements[index + 1],
            }));
            this.current = this.lists[0];
        }

        moveNext = () => {
            if (!this.current.nextItem) console.log('it is last element');
            this.current = this.current.nextItem ? this.current.nextItem : this.current;

            return this.current;
        };

        movePrev = () => {
            if (!this.current.prevItem) console.log('it is first element');
            this.current = this.current.prevItem ? this.current.prevItem : this.current;
            return this.current;
        };

        remove = (indexRemove: number) =>
            this.lists.filter((_, index) => index != indexRemove);

        change = <Obj extends iList, Field extends keyof iList>(
            indexChange: number,
            field: Field,
            value: Obj[Field],
        ) => {
            const element = this.lists.find((_, index) => index == indexChange);
            if (element) {
                element[field] = value;
            } else {
                console.log('wrong index');
            }
        };
        add = (item: iList) => {
            const lastItem = this.lists[this.lists.length - 1];
            lastItem.nextItem = item;
            this.lists.push({ ...item, prevItem: lastItem, nextItem: undefined });
        };

        get length() {
            return this.lists.length;
        }

        find = <Obj extends iList, Field extends keyof iList>(
            field: Field,
            value: Obj[Field],
        ) => {
            const elements = this.lists.find((item) => item[field] == value);
            if (elements) return elements;
            console.log('wrong params');
        };
    }
}
