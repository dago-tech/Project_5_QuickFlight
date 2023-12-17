# # Usa una imagen de Python para Django
# FROM python:3.11

# # Establece el directorio de trabajo
# WORKDIR /app

# # Copia el archivo requirements.txt e instala las dependencias
# COPY requirements.txt /app/
# RUN pip install --no-cache-dir -r requirements.txt

# # Copia el resto de la aplicación
# COPY . /app/

# # Expone el puerto en el que se ejecuta la aplicación Django
# EXPOSE 8000

# # Comando para ejecutar la aplicación
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]




# FROM python:3.11.1

# ENV PYTHONUNBUFFERED 1

# WORKDIR /app

# COPY requirements.txt .

# RUN pip install -r requirements.txt

# COPY . .

# EXPOSE 8000

# ENTRYPOINT ["/app/django.sh"]




FROM python:3.11.1

ENV PYTHONUNBUFFERED 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/

# Build psycopg2-binary from source -- add required required dependencies
RUN pip install -r requirements.txt

COPY . /app/backend/

EXPOSE 8000

#CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
ENTRYPOINT ["/app/backend/django.sh"]