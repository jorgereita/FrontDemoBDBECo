import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
    providedIn: 'root'
})
export class servicios {
    private todosCollection: AngularFirestoreCollection<any>;
    private catalogosCollection: AngularFirestoreCollection<any>;
    private seccionCollection: AngularFirestoreCollection<any>;
    private bannerColection: AngularFirestoreCollection<any>;
    private preventaColection: AngularFirestoreCollection<any>;
    private eventosColection: AngularFirestoreCollection<any>;

    private todos: Observable<any>;
    private catalogos: Observable<any>;
    private seccion: Observable<any>;
    private banner: Observable<any>; 
    private preventas: Observable<any>; 
    private eventos: Observable<any>; 
    
     private docRef: Observable<any>;
    public isLogged: any = false;

    constructor(private db: AngularFirestore, public afAuth: AngularFireAuth) {
        this.todosCollection = db.collection<any>('productos');
        this.catalogosCollection= db.collection<any>('catalogos');
        this.seccionCollection= db.collection<any>('secciones');
        this.bannerColection= db.collection<any>('bannerPrincipal');
        this.preventaColection= db.collection<any>('lanzamientos');
        this.eventosColection= db.collection<any>('eventos');

        afAuth.authState.subscribe(user => (this.isLogged = user))


        this.eventos = this.eventosColection.snapshotChanges().pipe(map(
            actions => {
                return actions.map(
                    a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    }
                )
            }
        ));


        this.preventas = this.preventaColection.snapshotChanges().pipe(map(
            actions => {
                return actions.map(
                    a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    }
                )
            }
        ));

        this.banner = this.bannerColection.snapshotChanges().pipe(map(
            actions => {
                return actions.map(
                    a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    }
                )
            }
        ));

        this.seccion = this.seccionCollection.snapshotChanges().pipe(map(
            actions => {
                return actions.map(
                    a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    }
                )
            }
        ));

        this.catalogos = this.catalogosCollection.snapshotChanges().pipe(map(
            actions => {
                return actions.map(
                    a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    }
                )
            }
        ));



        this.todos = this.todosCollection.snapshotChanges().pipe(map(
            actions => {
                return actions.map(
                    a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    }
                )
            }
        ));
   
    

    }

    //login
    async sendLogin(user: any) {
        try {
            return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        } catch (error) {
            console.log("error en login", error);
        }
    }
    //registrar
    onRegister(user) {

        return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

    }
    getProductos2(){

    }
 
    
    getTodos() {
        return this.todos   
    }
    getTodo(id) {
        return this.todosCollection.doc<any>(id).valueChanges();
    }
    getBanners() {
        return this.banner   
    }
    getPreventas() {
        return this.preventas   
    }
    getEventos() {
        return this.eventos   
    }
    updateTodo(todo, id) {
        return this.todosCollection.doc(id).update(todo);
    }
    updateCatalogo(todo, id){
        return this.catalogosCollection.doc(id).update(todo);
    }
    updatePreventa(todo, id) {
        return this.preventaColection.doc(id).update(todo);
    }
    updateEventos(todo, id) {
        return this.eventosColection.doc(id).update(todo);
    }
    addTodo(todo) {
        return this.todosCollection.add(todo)
    }
    addEventos(todo) {
        return this.eventosColection.add(todo)
    }
    addBaner(data){
        return this.bannerColection.add(data)
    }
    addPreventa(data){
        return this.preventaColection.add(data)
    }
    removeTodo(id) {
        return this.todosCollection.doc(id).delete();
    }
    removeBanner(id) {
        return this.bannerColection.doc(id).delete();
    }
    removePreventa(id) {
        return this.preventaColection.doc(id).delete();
    }
    removeEventos(id) {
        return this.eventosColection.doc(id).delete();
    }
    creeateCatalogo(data){
        return this.catalogosCollection.add(data);
    }
    creeateSeccion(data){
        return this.seccionCollection.add(data);
    }
    getCatalogos(){
        return this.catalogos
    }
    getSeccion(){
        return this.seccion
    }
    removeCatalogo(id){
        return this.catalogosCollection.doc(id).delete();
    }
    removeSeccion(id){
        return this.seccionCollection.doc(id).delete();
    }
}


























