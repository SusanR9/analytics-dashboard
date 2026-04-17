from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Record
from .serializers import RecordSerializer

@api_view(['GET'])
def get_records(request):
    records = Record.objects.all()
    serializer = RecordSerializer(records, many=True)
    return Response(serializer.data)