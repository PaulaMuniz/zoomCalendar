import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { tap } from 'rxjs/operators';
import { Room } from 'src/app/models/room';
import { AuthService } from '../auth/auth.service';
import { DatabaseService } from '../database/database.service';
import { EnvService } from '../env/env.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private authService:AuthService,
    private databaseService: DatabaseService
  ) { }

  // recupera os funcionarios da web
    getRoomsAPI() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.authService.token['token_type'] + ' ' + this.authService.token['access_token']
            })
        };
        return this.http
            .get(this.env.API_JSON + 'Salas', httpOptions)
            .pipe(
                tap(rooms => {
                    return rooms;
                }),
            );
    }

// salva um vetor de obras
saveRoomsBd() {
    return this.getRoomsAPI().subscribe(
        (data: any) => {
          console.log(data)
            return this.insert(data)
                .then((e) => {
                    return e;
                });
            },
            error => {
                //this.alertService.presentToast(error.error.message);
                console.error('Erro ao baixar salas: ' + error);
            },
            () => {
            }
        );
    }

    // inseri um funcionario no banco
    public insert(room: Array<Room>) {
        console.log(room);
        return this.databaseService.getDB()
            .then((db: SQLiteObject) => {
                let sql = 'insert or ignore into room (name, description) values ';
                var data = [];
                var rowArgs = [];
                room.forEach(function(room) {
                    rowArgs.push('(?, ?)');
                    data.push(room.name);
                    data.push(room.description);
                });
            sql += rowArgs.join(', ');
        
            return db.executeSql(sql, data)
            .then(() => {
                return true;
            })
            .catch((e) => console.error(e));
            })
        .catch((e) => console.error(e));
    }
}
