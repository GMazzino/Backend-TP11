module.exports = class Contenedor {
    static prodFile = require ("fs");
    static prodId = 0;
    static fname;

    constructor (fname){
        this.fname=fname;
    }
    async save (data) {
        try{
            data.id = ++Contenedor.prodId;
            await Contenedor.prodFile.promises.appendFile(this.fname,JSON.stringify(data,null,2),"utf-8");
            return Promise.resolve(data.id);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    async getById (id) {
        try{
            const fileContent = await this.getAll();
            const selectedProd = fileContent.find(prod => prod.id===parseInt(id));
            return Promise.resolve(selectedProd!=undefined?selectedProd:null);
        }
        catch(err) {
            return Promise.reject(err);
        }
    }

    async deleteById (id) {
        try{
            const fileContent = await this.getAll();
            if(fileContent.findIndex(prod => prod.id===parseInt(id)) != -1){
                const preserveProd = fileContent.filter(prod => prod.id!==parseInt(id));
                await Contenedor.prodFile.promises.writeFile(this.fname,JSON.stringify(preserveProd,null,2),"utf-8");
            } else {
                return Promise.reject("El ID seleccionado no existe!!");
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    async deleteAll () {
        try{
            await Contenedor.prodFile.promises.writeFile(this.fname,"","utf-8");
            return Promise.resolve(`Contenido de ${this.fname} borrado!!`)
        }
        catch (err) {
            return Promise.reject(err.message);
        }
    }
}