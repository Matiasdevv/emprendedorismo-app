
create schema if not exists colegio_test;

use colegio_test;

DROP TABLE IF EXISTS personal;


CREATE TABLE personal(
	
    `dni` int not null,
    `nombre` varchar(80) not null,
    `direccion` varchar(100) not null,
    `telefono` char(8) not null,
    `cargo` varchar(80) not null,
	`titulo` varchar(100) not null,
    
    primary key(dni)

);


drop table if exists sitRevista;

create table sitRevista (

	id int auto_increment,
    `nombre` varchar(80),
    
    primary key(id)

);



drop table if exists orientacion;

create table orientacion(
	id int auto_increment,
	`nombre` varchar(20) not null,
	primary key(id)
    
);

drop table if exists turno;

create table turno(
	idTurno int auto_increment,
    nombre varchar(10),
    
    primary key(idTurno)
);

DROP TABLE IF EXISTS cursoNumero;


create table cursoNumero(

	idCursoNumero int auto_increment,
    nombre varchar(30),
    
    primary key(idCursoNumero)

);

DROP TABLE IF EXISTS division;

create table division(

	id int auto_increment,
    `nombre` varchar(80),
    
	primary key(id)
);


DROP TABLE IF EXISTS curso;

CREATE TABLE curso(
	
	registroCurso int auto_increment,
    idCurso int not null ,
    `division` int not null,
    `idTurno` int not null,
    `orientacionId` int not null default '3',
    `preceptorId` int not null,
    
    foreign key(orientacionId) references orientacion(id) on update no action,
    foreign key(preceptorId) references personal(dni) on update no action,
    foreign key(idCurso) references cursoNumero(idCursoNumero) on update no action,
	foreign key(idTurno) references turno(idTurno) on update no action,
    foreign key(division) references division(id) on update no action,
    primary key(registroCurso)

);
#Error Code: 1005. Can't create table `colegio_test`.`curso` 




DROP TABLE IF EXISTS materia;

CREATE TABLE materia(
	
    id int auto_increment,
    `nombre` varchar(20) not null,
    `turno` varchar(20) not null,
    `orientacion` int not null,
    `sitRevistaId` int not null,
    `dni_profesor` int default null,
    `idCurso` int not null,
    
    foreign key(sitRevistaId) references sitRevista(id)
    	ON DELETE no action
		ON UPDATE no action
    ,
    foreign key(dni_profesor) references personal(dni)
		ON DELETE no action
		ON UPDATE no action,
    foreign key(orientacion) references orientacion(id) 
		on delete no action
		on update no action,
   foreign key(idCurso) references curso(idCurso) 
		on delete no action
		on update no action,
    primary key(id)

);


drop table if exists alumno;

create table alumno(
		`dniAlumno` int not null,
        `nombreAlumno` varchar(20) not null,
        `matricula` int not null,
        `curso_id` int not null ,
        `direccion` varchar(100) not null,
        `email` varchar(100) not null,
 
		foreign key (curso_id) references curso(idCurso)
		ON DELETE no action
		ON UPDATE no action,
		primary key(dniAlumno, nombreAlumno)
);


drop table if exists notas;


create table notas(

			idRegistro int auto_increment,
			 nota int not null,
            `dniAlumno` int not null,
            `idMateria` int not null, #todo: cambiar ints por char
            `dniProfesor` int ,
            `idCuatrimestre`int default null,
            
            
            primary key (idRegistro),
            
            
           constraint  fk_alumn foreign key(dniAlumno) references alumno(dniAlumno)
				on update cascade,
		  constraint  fk_per foreign key(dniProfesor) references personal(dni)
				on update cascade
);


drop table if exists tutor;

create table tutor(

	`dniTutor` int not null,
    `nombreTutor` varchar(20) not null,
    `direccion` varchar(100) not null,
    `telefono` char(9) not null,
    `dniAlumno` int not null,
    `email` varchar(80) not null,
    
    
	foreign key(dniAlumno) references alumno(dniAlumno),
    primary key(dniTutor, nombreTutor)
    
    

);



drop table if exists tutorDetalles;

/*TODO: relacion tutor-alumnos n:m me parece alter table tutor add foreign key(dniAlumno) references alumno(dniAlumno);*/

create table tutorDetalles(
		`nombreAlumno` int,
        `nombreTutor` int,
        

       foreign key(nombreTutor) references tutor(dniTutor)
			on update cascade,
	  foreign key(nombreAlumno) references alumno(dniAlumno)
			on update cascade,
            
            
            primary key(nombreAlumno,nombreTutor)
        
);


drop table if exists tipoAsis;

create table tipoAsis(

	id int auto_increment,
	`nombre` varchar(20) not null,
	primary key(id)
);


drop table if exists asistencia;

create table asistencia(

	`dia` varchar(255) not null,
    `tipo` int not null,
    `alumno_dni` int not null,
    `preceptorId` int not null,
    `justify`varchar(100) default null,

    
    foreign key(preceptorId) references personal(dni) 
		on delete no action
		on update no action,
    foreign key(tipo) references tipoAsis(id)
        on delete no action
		on update no action,
	foreign key(alumno_dni) references alumno(dniAlumno) 
		on delete no action
		on update no action

);


drop table if exists usuario;

create table if not exists usuario(

	registro int auto_increment,
	cuenta char(8),
    password char(9),

	primary key(registro)
);


################################################################################################



/*
Aca ir??n los valores predefinidos, sin estos probablemente te tire un error a la hora de hacer crud.
Igualmente es para cuando se levanta la bdd, ya una vez iniciada se puede cambiar lo q sea.
*/
/*

#QUERYs (Est??n colocadas en forma de cascada, es decir que una depende de otra, si falla una, se para)

insert into tipoAsis(nombre)
 values ('Presente'),
		('Tardanza'),
		('Ausente');
        
        




insert into sitRevista(nombre)
 values ('Titular'),
		('Suplente'),
		('Interino');
        
        
insert into orientacion(nombre) 

values	('informatica(TIPP)'),
		('Turismo(TGST)'),
        ('Ciclo Basico')
;
insert into turno(nombre) values
('Ma??ana'),
('Tarde')
;
insert into cursoNumero(nombre)values 
('Primer a??o'),
('Segundo a??o'),
('Tercer a??o'),
('Cuarto a??o'),
('Quinto a??o'),
('Sexto a??o'),
('Septimo a??o')
;

insert into personal 
values
(1,'Profe Random1','Diego Alcorta 555','+5492804190222','preceptor','Matematicas'),
(2,'Profe Random2','peron','+5492804190225','director','administracion de empresas'),
(3,'Profe Random3','Direccion Random','+5492804190225','profesor','desarrollo'),
(4,'Profe Random4','Direccion Random1','+5492804190444','profesor','Herramienas')
;


insert into materia (nombre,turno,orientacion,sitRevistaId,dni_profesor,idCurso)
values
('Matematica','Tarde',1,1,1,1),
('Desarrollo','Ma??ana',1,1,4,7),
('lenguaje musical','tarde',3,3,3,4),
('Software','ma??ana',1,2,4,2),
('Electricidad','ma??ana',2,2,null,5)
;

insert into division(nombre) values
('Primera divisi??n')
('Segunda divisi??n'),
('Tercera divisi??n'),
('Cuarta divisi??n);

insert into curso (idCurso, division,idTurno,orientacionId,preceptorId)
values
(1,3,1,2,1),
(2,3,1,2,1),
(3,3,1,2,1),
(4,1,1,2,1),
(5,1,1,2,1),
(6,1,1,2,1),
(7,1,1,2,1),

(1,3,1,2,1),
(2,3,1,2,1),
(3,3,1,2,1),
(4,1,1,2,1),
(5,1,1,2,1),
(6,1,1,2,1),
(7,1,1,2,1)

;
   
	#Nota: en caso de que se produsca, iniciar personal, luego materias y al final curso 
   
   



insert into alumno 

values 
	(46082789,'Alumno Random1',12345,2,'Rojas esquina porres','elmati@gmail.com'),
	(8973652,'Alumno Random2',123521,4,'Belgrano 800','carlinho@imaginagroup.com'),
	(22598092,'Alumno Random3',333422,3,'Mitre 500','gales@galderon.co'),
	(89732221,'Alumno Random4',0098123871,1,'Bosco 989','camel@outlook.net'),
    (89221,'Alumno Random5',0098171,1,'Bosco 9w29','camel@prueba.net')
;

insert into asistencia
 values ('lunes',2,46082789,1,''),
		('16-8-22',3,22598092,1,'Justificacion random'),
		('16-8-22',3,46082789,1,'Justificacion justificada'),
        ('16-8-22',1,22598092,'1','');

insert into tutor 
values 
(99823,'Tutor random1','alvear',87323,8973652,'tutor@exaple.com'),
(99824,'Tutor random2','alvear',8732323,46082789,'tutor2@exaple.com'),
(99823,'Tutor random3','alvear',8732233,8973652,'tutor4@exaple.com');


insert into notas (nota,dniAlumno,idMateria, dniProfesor,idCuatrimestre)
values

(7,8973652,4,1,1),
(8,22598092,3,3,1),
(9,46082789,1,4,1);


insert into usuario(cuenta, password) values ('admin','admin');

*/

/*
#CONSULTAS (esto se ver?? mas reflejado en la api del servidor)

#analis??s

analyze table personal;


###

select n.idRegistro as'registro', m.nombre as 'materia', a.nombreAlumno as 'alumno', p.nombre as 'profesor', n.idCuatrimestre as 'cuatrimestre'

 from notas n
 join alumno a on n.dniAlumno = a.dniAlumno
 join personal p on n.dniProfesor = p.dni
 join materia m on n.idMateria = m.id
 ;

update personal 
set personal.cargo = 'profesor'
where personal.dni = 1;


update alumno 
set dniAlumno = 23, nombreAlumno = 'Josesito', direccion = '', email = ''
where alumno.dniAlumno = 89732221;



/*
	Importante saber como se hace la consulta para saber las faltas pq sino es un garr??n querer implementar esto a la bdd
*/
/*
#consulta para las asistencias 

select count(
Case when asi.tipo=1 then 'Asistencia' 
	 when asi.tipo=2 then 'Tardanza' 
	 when asi.tipo=3 then 'Inasistencia' end
) as 'a', a.nombreAlumno
#,(select alumno_dni from asistencia where alumno_dni = 1)
from
	asistencia asi
	join alumno a
    on a.dniAlumno = asi.alumno_dni
 ;


select asis.dia, asis.preceptorId as 'preceptor', asis.tipo, a.nombreAlumno as 'alumno', asis.justify as 'justificacion' from 
asistencia asis
join alumno a on alumno_dni = a.dniAlumno;

select m.nombre,
	(select nombre from personal where personal.dni = m.dni_profesor and personal.cargo = 'profesor') as 'Profesor'
from materia m
;


/*
	En este lado se encuentran las posibles consultas a realizar, igualmente debo aprender sobre consultas en backend (aprendido)
*/


/*


select * from personal;

select*from orientacion;

select * from curso;

select * from alumno;

select * from materia;

select * from tipoAsis;




 
 
#consultas avanzadas

#curso

select a.nombre as 'Alumnos'
 from alumno a where a.cursoId = 2;


update personal
 set personal.cargo = 'preceptor'
 where personal.dni = 1;
 
 
 
 update orientacion
 set orientacion.nombre = 'Informatica(TIPP)'
 where orientacion.id = 3;
 
 #curso (todo: cambios)

select c.idCurso as 'Curso', c.division as 'Division', t.nombre as 'Turno',p.nombre as 'Preceptor', o.nombre as 'Orientacion'
	from curso c
    join turno t on c.idTurno = t.idTurno
    join personal p on c.preceptorId = p.dni
    join orientacion o on c.orientacionId = o.id
;

#materia (funciona 100%)


select
  m.nombre as 'Materia',
  m.turno as 'Turno',
  m.idCurso as 'Curso', 
  o.nombre as 'Orientacion',
 (select nombre from sitRevista where sitRevista.id = m.sitRevistaId) as 'Situacion de revista',
   	CASE p.cargo
	WHEN 'profesor' then p.nombre
    else 'Sin profesor asignado'
	end
    as 'Profesor'
from materia m 

	inner join orientacion o
    
    on(o.id = m.orientacion)

	inner join personal p
	on(p.dni = m.dni_profesor)

;



##materia (no funciona)


select 
  m.nombre as 'Materia',
  m.turno as 'Turno', 
  o.nombre as 'Orientacion',
  m.sitRevistaId as 'Situacion de revista',
   	CASE p.cargo
		WHEN 'profesor' then p.nombre
		else 'Sin profesor asignado'
	end
    as 'Profesor'

from materia m

	inner join orientacion o on o.id = m.orientacion
    inner join personal p
    on(p.dni = m.dni_profesor)
	
;



select * from notas;









#alumno 


select a.dniAlumno, a.nombreAlumno, a.matricula, c.idCurso, c.division , c.orientacionId,  a.direccion, a.email
from alumno a
inner join curso c
where(a.curso_id = c.idCurso)
;

