from rest_framework import serializers
from restapi.rest.models import Entry
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class EntrySerializer(serializers.Serializer):
    id         = serializers.IntegerField(read_only=True)
    title      = serializers.CharField(max_length=255)
    content    = serializers.CharField()
    created_at = serializers.DateTimeField(required=False)
    updated_at = serializers.DateTimeField(required=False)
    user       = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    # Creating a new entry
    def create(self, validated_data):
        return Entry.objects.create(**validated_data)
        
    # Updating an existing entry
    def update(self, instance, validated_data):
        instance.title      = validated_data.get('title', instance.title)
        instance.content    = validated_data.get('content', instance.content)
        instance.updated_at = validated_data.get('updated_at', instance.updated_at)
        instance.save()
        return instance
    
class UserSerializer(serializers.Serializer):
    password   = serializers.CharField(max_length=128)
    username   = serializers.CharField(max_length=150)
    first_name = serializers.CharField(max_length=150)
    last_name  = serializers.CharField(max_length=150)
    email      = serializers.CharField(max_length=254)

    # Creation of a new user
    def create(self, validated_data):
        password = make_password(validated_data.get("password")) # Create a hashed password from validated-data 
        validated_data["password"] = password # Put the new hashed version of the password into validated_data
        return User.objects.create(**validated_data)
    
    # Updating user info, ie: forgot password
    def update(self, instance, validated_data):
        instance.password   = make_password(validated_data.get('password', instance.password))
        instance.username   = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name  = validated_data.get('last_name', instance.last_name)
        instance.email      = validated_data.get('email', instance.email)
        instance.save()
        return instance




# pbkdf2_sha256$1000000$8vLf6oyA0Zk6D60kbJeQAG$7afWdO39wfz1OVewc9Auk5zB0pXWlG+dNCzxe4lG6yM=