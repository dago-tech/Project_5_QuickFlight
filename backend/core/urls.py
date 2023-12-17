from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/flights/', include("flights.urls", namespace='flights_api')),
    path('docs/', include_docs_urls(title='QuickFlight')),
    path('schema', get_schema_view(
        title="QuickFlight",
        description="API for QuickFlight APP",
        version="1.0.0"
    ), name='openapi-schema'),
]
