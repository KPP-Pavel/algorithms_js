{
    interface iVertex {
        name: string;
        connects: iVertex[];
    }

    class Graf {
        vertex: { [key: string]: iVertex } = {};

        delete = (name: string) => {
            const res = delete this.vertex[name];

            for (const key in this.vertex) {
                this.vertex[key].connects = this.vertex[key].connects.filter(
                    (item) => item.name != name,
                );
            }

            return res;
        };

        getVertex = (name: string) => this.vertex[name];

        addVertex = (vertex: iVertex) => {
            if (this.vertex[vertex.name]) {
                console.log('vertex is added before');
                return;
            }
            this.vertex[vertex.name] = vertex;
        };

        checkVertextName = (vertexName: string) => {
            if (!this.vertex[vertexName]) {
                console.log('wrong vertex name');
                return false;
            }
            return true;
        };
        addConnect = (vertexName: string, vertexes: iVertex[]) => {
            if (!this.checkVertextName(vertexName)) return;

            const connectsFilter = this.vertex[vertexName].connects
                ? this.vertex[vertexName].connects.filter(
                      (item) => !vertexes.some((ver) => ver.name == item.name),
                  )
                : [];

            this.vertex[vertexName].connects = this.vertex[vertexName].connects
                ? [...connectsFilter, ...vertexes]
                : vertexes;
        };

        get length() {
            return Object.keys(this.vertex).length;
        }

        findShortDistance = (vertexNameStart: string, vertexNameEnd: string) => {
            if (!this.checkVertextName(vertexNameStart)) return;
            if (!this.checkVertextName(vertexNameEnd)) return;

            let isFound = false;
            const queue = [this.vertex[vertexNameStart]];
            let visited = { [vertexNameStart]: { parent: this.vertex[vertexNameStart] } };

            const checkVertex = (vertex: iVertex) => {
                isFound = vertex.connects.some((item) => item.name == vertexNameEnd);
                vertex.connects.forEach((connect) => {
                    if (!visited[connect.name]) {
                        visited[connect.name] = { parent: vertex };
                        queue.push(connect);
                    }
                });
                if (isFound) visited[vertexNameEnd] = { parent: vertex };
            };

            while (queue.length && !isFound) {
                checkVertex(queue.shift()!);
            }

            if (isFound) {
                const lastKey = Object.keys(visited).reverse()[0];

                const path: iVertex[] = [this.vertex[vertexNameEnd]];
                let vertex = visited[lastKey];
                while (true) {
                    if (vertex.parent.name == vertexNameStart) break;
                    path.push(vertex.parent);
                    vertex = visited[vertex.parent.name];
                }

                path.push(this.vertex[vertexNameStart]);
                return path.reverse();
            }
        };
    }

    const graf = new Graf();
    graf.addVertex({ name: 'A', connects: [] });
    graf.addVertex({ name: 'B', connects: [] });
    graf.addVertex({ name: 'C', connects: [] });
    graf.addVertex({ name: 'D', connects: [] });
    graf.addVertex({ name: 'E', connects: [] });
    graf.addVertex({ name: 'F', connects: [] });
    graf.addVertex({ name: 'G', connects: [] });
    graf.addVertex({ name: 'H', connects: [] });

    graf.addConnect('A', [graf.getVertex('B'), graf.getVertex('F'), graf.getVertex('C')]);
    graf.addConnect('B', [graf.getVertex('A')]);
    graf.addConnect('C', [graf.getVertex('D'), graf.getVertex('E'), graf.getVertex('A')]);
    graf.addConnect('F', [graf.getVertex('A'), graf.getVertex('G')]);
    graf.addConnect('D', [graf.getVertex('C')]);
    graf.addConnect('E', [graf.getVertex('C')]);
    graf.addConnect('G', [graf.getVertex('F')]);

    graf.delete('G');
    console.log(graf.vertex);
    console.log(graf.getVertex('F'));
}

// const arr = ['wrapper', 'row', 'score'] as const;

// const createObj = (arr: string[]) => {
//     const hash = 'joiwjfanc';  //some hash function
//     const obj: { [key: string]: string } = {};
//     arr.forEach((item) => (obj[item] = `${hash}_${item}`));
//     return obj;
// };

// const obj = createObj(arr);

// interface IUseSorterParams<T extends readonly string[]> {
//     fields: T
//     onChange?: (sort: Pick<ISorter<T[number]>, 'field' | 'order'>) => void
//     defaultField?: T[number]
//     defaultOrder?: ESortOrder
//   }
  
//   export function useSorter<
//     T extends object,
//     P extends IUseSorterParams<readonly Exclude<keyof T, number | symbol>[]> = IUseSorterParams<
//       readonly Exclude<keyof T, number | symbol>[]
//     >
//   >(p: P): ISorter<P['fields'][number]>