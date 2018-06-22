////////////////////////////////////////////////////////////////////////////////////////////
// The MIT License (MIT)                                                                  //
//                                                                                        //
// Copyright (C) 2016  Chriss Mejía - me@chrissmejia.com - chrissmejia.com                //
//                                                                                        //
// Permission is hereby granted, free of charge, to any person obtaining a copy           //
// of this software and associated documentation files (the "Software"), to deal          //
// in the Software without restriction, including without limitation the rights           //
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell              //
// copies of the Software, and to permit persons to whom the Software is                  //
// furnished to do so, subject to the following conditions:                               //
//                                                                                        //
// The above copyright notice and this permission notice shall be included in all         //
// copies or substantial portions of the Software.                                        //
//                                                                                        //
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR             //
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,               //
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE            //
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER                 //
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,          //
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE          //
// SOFTWARE.                                                                              //
////////////////////////////////////////////////////////////////////////////////////////////

import JSFiles from "./files";
import Config from "../interfaces/config";
import { Promise } from "es6-promise";
import JSloth from "./core";

/**
* JSloth Path
* Check the right path, search /core/ first and /app/ if is not found it.
*/
export default class JSPath {

    /*** JSloth library */
    protected jsloth: JSloth;

    /*** Configuration methods */
    constructor(jsloth: JSloth) {
        this.jsloth = jsloth;
    }

    /**
     * Get the new full path.
     *
     * @param file string Filename
     * @return void
     */
    public get(type: string, app: string, file: string): Promise<string> {
        let customPath: string = "../source/views/" + app + "/" + file;
        console.log(customPath);
        let path: string = "../source/apps/" + app + "/views/" + file;
        if (type == "system") {
            path = "../source/system/apps/" + app + "/views/" + file;
        }

        // Create promise
        const p: Promise<string> = new Promise(
            (resolve: (exists: string) => void, reject: (err: NodeJS.ErrnoException) => void) => {
                // Resolve promise
                this.jsloth.files.exists(this.jsloth.context.sourceURL + customPath + ".ejs").then((exist) => {
                    resolve(customPath);
                }).catch((err: NodeJS.ErrnoException) => {
                    console.log(path)
                    resolve(path);
                    throw err;
                });
            });
        return p;
    }

    /**
     * Get the new full angular path.
     *
     * @param file string Filename
     * @return string
     */
    public getAngular(folder: string, app: string, file: string): string {
        return "../dist/browser/" + app + "/" + file;
    }


}